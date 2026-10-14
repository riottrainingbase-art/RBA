import { permanentRedirect } from "next/navigation";

// The strategic roadmap is no longer offered as a public page.
// Legacy URLs lead to the public vision and guiding principles only.
export default function RetiredTaiwanRoadmap() {
  permanentRedirect("/ja/taiwan#taiwan-principles");
}
