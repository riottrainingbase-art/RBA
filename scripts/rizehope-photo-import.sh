#!/usr/bin/env bash
# Import ONLY the nine already reviewed WebP files from the RIZEHOPE package.
# This does not set publication flags, commit, merge, deploy, or charge anyone.
set -euo pipefail
if [[ $# -ne 1 ]]; then
  echo "Usage: bash scripts/rizehope-photo-import.sh /path/to/RBA_RIZEHOPE_site_gallery_9photos_ready_for_upload.zip" >&2
  exit 64
fi
archive="$1"
root="$(cd "$(dirname "$0")/.." && pwd)"
manifest="$root/docs/rizehope/rizehope-images.sha256"
[[ -f "$archive" && -f "$manifest" ]] || { echo "Archive or checksum manifest not found" >&2; exit 66; }
command -v unzip >/dev/null || { echo "unzip required" >&2; exit 69; }
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

# Verify every byte BEFORE copying anything into public/.
while IFS=' ' read -r expected relative; do
  [[ "$expected" =~ ^[[:xdigit:]]{64}$ ]] || { echo "Bad digest: $relative" >&2; exit 65; }
  [[ "$relative" == public/media/rizehope-2027/*.webp ]] || { echo "Unexpected path $relative" >&2; exit 65; }
  dest="$tmp/${relative##*/}"
  unzip -p "$archive" "$relative" > "$dest"
  if command -v sha256sum >/dev/null 2>&1; then actual="$(sha256sum "$dest" | awk '{print $1}')"
  else actual="$(shasum -a 256 "$dest" | awk '{print $1}')"; fi
  [[ "$actual" == "$expected" ]] || { echo "Checksum mismatch for $relative" >&2; exit 65; }
  [[ "$(dd if="$dest" bs=1 count=4 2>/dev/null)" == "RIFF" ]] || { echo "Not RIFF: $relative" >&2; exit 65; }
  echo "Verified: $relative"
done < "$manifest"

# All nine files verified; now copy.
mkdir -p "$root/public/media/rizehope-2027"
while IFS=' ' read -r expected relative; do
  cp "$tmp/${relative##*/}" "$root/$relative"
done < "$manifest"
echo "Imported the nine original reviewed images into public/media/rizehope-2027/."
echo "NEXT: verify shooting event/date and attribution, then run CI and request a real Preview."
echo "Publication gates remain disabled until separately approved."
