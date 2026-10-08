import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const data=JSON.parse(fs.readFileSync('content/leaving-work.json','utf8').replace(/^\uFEFF/,''));
const html=fs.readFileSync('dist/start/leaving-work.html','utf8');
const config=JSON.parse(fs.readFileSync('site.config.json','utf8'));
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size,'Feature page contains duplicate DOM IDs');
for(const [,target] of html.matchAll(/href="#([^"]+)"/g))assert(ids.includes(target),`Broken feature anchor ${target}`);
for(const route of data.routes)for(const id of route.sectionIds)assert(ids.includes(id),`Broken route ${route.id}: ${id}`);
for(const source of [...data.sections.flatMap(s=>s.sources),...data.deadlines.map(d=>d.source)])assert.equal(new URL(source.url).protocol,'https:');
assert(data.routes.length===4,'Expected four clearly separated reader situations');
for(const route of data.routes){
  const start=html.indexOf(`<details class="route" id="route-${route.id}">`);
  assert(start>=0,`Reader route must be an expandable card: ${route.id}`);
  const card=html.slice(start,html.indexOf('</details>',start));
  assert(card.includes('<summary>'),`Route summary missing: ${route.id}`);
  for(const id of route.sectionIds)assert(card.includes(`href="#${id}"`),`Route step is not clickable: ${route.id}/${id}`);
}
assert(!/<h2>\s*\d+[.．、]\s/u.test(html),'Section headings must not repeat source numbering');
assert(!/<a href="#[^"]+">\s*\d+[.．、]\s/u.test(html),'Navigation titles must not repeat source numbering');
const deadlines=html.match(/<aside class="deadline-panel"[\s\S]*?<\/aside>/)?.[0];
assert(deadlines,'Missing deadline panel');
assert.equal([...deadlines.matchAll(/class="deadline"/g)].length,data.deadlines.length);
if(data.deadlines.length>3){
  const foldAt=deadlines.indexOf('<details class="deadline-more print-expand">');
  assert(foldAt>=0&&deadlines.includes('<summary>給付・税金の期限も確認</summary>'));
  assert.equal([...deadlines.slice(0,foldAt).matchAll(/class="deadline"/g)].length,3,'Show only the three earliest-action deadlines before the disclosure');
}
assert(data.sections.length>=8&&data.deadlines.length>=3&&data.checklist.length>=5);
assert.equal(new Set(data.checklist.map(c=>c.id)).size,data.checklist.length);
assert(html.includes(config.siteUrl+'start/leaving-work.html'));
assert(fs.readFileSync('dist/sitemap.xml','utf8').includes(config.siteUrl+'start/leaving-work.html'));
assert(fs.readFileSync('dist/index.html','utf8').includes(config.siteUrl+'start/leaving-work.html'));
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
assert.equal(scripts.length,1);scripts.forEach(s=>new vm.Script(s));
// Exercise printing without a browser: closed deadline disclosures must print,
// and the reader's open/closed choices must be restored afterwards.
const listeners=new Map();
const disclosures=[{open:false},{open:true}];
const controls=new Map();
const control=id=>{if(!controls.has(id))controls.set(id,{textContent:'',addEventListener(){}});return controls.get(id);};
vm.runInNewContext(scripts[0],{
  document:{querySelectorAll:selector=>selector==='.print-expand'?disclosures:[],getElementById:control},
  window:{addEventListener:(event,handler)=>listeners.set(event,handler),print(){}},
});
assert(listeners.has('beforeprint')&&listeners.has('afterprint'),'Print must include collapsed deadline entries');
listeners.get('beforeprint')();
assert(disclosures.every(d=>d.open),'Collapsed deadlines would be missing from print');
listeners.get('beforeprint')();
listeners.get('afterprint')();
assert.deepEqual(disclosures.map(d=>d.open),[false,true],'Printing must preserve reader disclosure choices');
assert(!/localStorage|sessionStorage|fetch\(|XMLHttpRequest/.test(scripts.join('')),'Feature checklist must not save or transmit reader data');
assert(!/<script[^>]*\bsrc=/.test(html),'Standalone feature must work without external scripts');
for(const f of ['LEAVING-WORK.md','LAUNCH-PLAN.md','READER-FEEDBACK.md','CAMPAIGN.md'])assert(fs.statSync('docs/'+f).size>300);
assert(fs.statSync('dist/leaving-work-cover.png').size>5000);
assert(html.includes('window.print()')&&html.includes('@media print'));
console.log(`PASS: feature routes, all internal anchors, ${data.sections.length} sections, ${data.deadlines.length} deadline entries, checklist privacy, standalone scripts, sitemap and launch documents.`);
