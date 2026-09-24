// Geographic outlines from Natural Earth, public domain.
// Input: ne_50m_admin_0_countries.geojson from natural-earth-vector.
import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
for(const [name,bounds] of [['japan',[122,148,23,47]],['world',[-180,180,-60,85]]]){
 const [west,east,south,north]=bounds;
 const xy=([lon,lat])=>[(lon-west)/(east-west)*1000,(north-lat)/(north-south)*1000];
 const paths=[];
 for(const f of data.features){
  if(name==='japan'&&f.properties.ADM0_A3!=='JPN')continue;
  if(f.properties.ADM0_A3==='ATA')continue;
  const polygons=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
  for(const polygon of polygons){
   const points=polygon[0];
   if(!points.some(([x,y])=>x>=west&&x<=east&&y>=south&&y<=north))continue;
   let prev=null;const reduced=points.filter((p,i)=>{const q=xy(p);if(i===points.length-1||!prev||Math.hypot(q[0]-prev[0],q[1]-prev[1])>1.2){prev=q;return true;}return false;});
   if(reduced.length<3)continue;
   paths.push('<path d="'+reduced.map((p,i)=>(i?'L':'M')+xy(p).map(n=>n.toFixed(1)).join(',')).join('')+'Z"/>');
  }
 }
 const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" preserveAspectRatio="none"><rect width="1000" height="1000" fill="#edf0f0"/><g fill="#c6cece" stroke="#fff" stroke-width="0.65">'+paths.join('')+'</g></svg>';
 fs.writeFileSync('public/network-'+name+'.svg',svg);
 console.log(name,paths.length,Buffer.byteLength(svg));
}
