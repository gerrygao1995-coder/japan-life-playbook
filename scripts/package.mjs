import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const out=path.resolve(process.argv[2]||'release');
const source=process.cwd();
const destination=path.join(out,'kurashi-no-handancho');
fs.mkdirSync(destination,{recursive:true});
const included=['.github','book','content','docs','dist','scripts','README.md','GUIDE.md','CONTRIBUTING.md','CHANGELOG.md','LICENSE-CODE','LICENSE-CONTENT','package.json','.gitignore','index.template.html','style.css','app.js'];
for(const item of included)fs.cpSync(path.join(source,item),path.join(destination,item),{recursive:true});
for(const [from,to] of [['GUIDE.md','くらしの判断帖・全編.md'],['dist/kurashi-offline.html','くらしの判断帖・オフライン.html']])fs.copyFileSync(path.join(source,from),path.join(out,to));
// tar's ZIP format includes .github and .gitignore on Windows, unlike wildcard copying.
const zip=path.join(out,'kurashi-no-handancho-github.zip');
execFileSync('tar',['-a','-c','-f',zip,'-C',out,'kurashi-no-handancho'],{stdio:'inherit'});
console.log(JSON.stringify({directory:destination,archive:zip}));
