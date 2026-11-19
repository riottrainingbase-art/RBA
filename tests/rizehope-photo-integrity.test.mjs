import assert from "node:assert/strict";
import {test} from "node:test";
import {readFileSync,existsSync} from "node:fs";
import {createHash} from "node:crypto";
import {join} from "node:path";
import {fileURLToPath} from "node:url";
const root=fileURLToPath(new URL("../",import.meta.url));
const source=readFileSync(join(root,"lib/rizehope-2027.ts"),"utf8");
const manifest=readFileSync(join(root,"docs/rizehope/rizehope-images.sha256"),"utf8").trim().split("\n");
const hashes=new Map(manifest.map(line=>{
  const [sha,path]=line.split(/\s{2}/);
  assert.match(sha,/^[0-9a-f]{64}$/);assert.ok(path?.startsWith("public/media/rizehope-2027/"));
  return [path,sha];
}));

test("exactly nine provided WebP candidates are named and checksummed",()=>{
  assert.equal(hashes.size,9);
  const names=[...source.matchAll(/src: "(\/media\/rizehope-2027\/[^"]+\.webp)"/g)].map(x=>x[1]);
  assert.equal(names.length,9);
  assert.equal(new Set(names).size,9);
  assert.deepEqual(new Set(names.map(name=>"public"+name)),new Set(hashes.keys()));
});

test("uploaded photo files, if present, match the consent-cleared supplied archive",()=>{
  for(const [relative,expectedHash] of hashes){
    const file=join(root,relative);
    if(!existsSync(file)){
      // A metadata-only PR is acceptable ONLY while the publication flags stay off.
      assert.match(source,/imageFilePresentAndVerified: false/);
      continue;
    }
    const bytes=readFileSync(file);
    assert.ok(bytes.length>1024&&bytes.length<2_000_000,relative+" unexpected size");
    assert.equal(bytes.toString("ascii",0,4),"RIFF",relative+" is not RIFF");
    assert.equal(bytes.toString("ascii",8,12),"WEBP",relative+" is not WebP");
    const actual=createHash("sha256").update(bytes).digest("hex");
    assert.equal(actual,expectedHash,relative+" mismatches the reviewed photo package");
  }
});

test("publication additionally requires verified archival event and attribution",()=>{
  assert.equal((source.match(/usageRightsConfirmed: true/g)||[]).length,9);
  assert.equal((source.match(/childrensPhotoConsentConfirmed: true/g)||[]).length,9);
  assert.equal((source.match(/imageFilePresentAndVerified: false/g)||[]).length,9);
  assert.equal((source.match(/sourceEventVerified: false/g)||[]).length,9);
  assert.equal((source.match(/creditVerified: false/g)||[]).length,9);
  for(const name of ["photo.imageFilePresentAndVerified","photo.sourceEventVerified","photo.creditVerified","photo.sourceDate","photo.sourceEventJa","photo.sourceEventEn"])
    assert.ok(source.includes(name),name+" missing from approved gallery filter");
});
