import fs from 'node:fs';
import path from 'node:path';
import {zip as createZip} from './formats.mjs';
const out=path.resolve(process.argv[2]||'release');
const source=process.cwd();
const destination=path.join(out,'kurashi-no-handancho');
fs.mkdirSync(destination,{recursive:true});
// Remove stale generated chapter copies only; all other user files are preserved.
const destinationBook=path.join(destination,'book');
if(fs.existsSync(destinationBook))for(const name of fs.readdirSync(destinationBook)){
 if(/^\d{2}-[a-z]+\.md$/.test(name)&&!fs.existsSync(path.join(source,'book',name)))fs.unlinkSync(path.join(destinationBook,name));
}
const included=['.github','book','content','docs','dist','scripts','README.md','GUIDE.md','CONTRIBUTING.md','CHANGELOG.md','LICENSE-CODE','LICENSE-CONTENT','package.json','.gitignore','index.template.html','style.css','app.js','enhancements.js','site.config.json'];
for(const item of included)fs.cpSync(path.join(source,item),path.join(destination,item),{recursive:true});
for(const [from,to] of [['GUIDE.md','くらしの判断帖・全編.md'],['dist/kurashi.epub','くらしの判断帖.epub'],['dist/kurashi-offline.html','くらしの判断帖・オフライン.html']])fs.copyFileSync(path.join(source,from),path.join(out,to));
// Package only the reviewed allowlist; keep local hosting credentials out of archives.
const zip=path.join(out,'kurashi-no-handancho-github.zip');
const entries=[];
function collect(file,name){const info=fs.lstatSync(file);if(info.isDirectory())for(const child of fs.readdirSync(file).sort())collect(path.join(file,child),name+'/'+child);else if(info.isFile())entries.push([name,fs.readFileSync(file)]);}
for(const item of included)collect(path.join(source,item),'kurashi-no-handancho/'+item);
fs.writeFileSync(zip,createZip(entries));
console.log(JSON.stringify({directory:destination,archive:zip}));
