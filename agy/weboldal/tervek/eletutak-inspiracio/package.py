"""Package a separate, static concept. Never changes the application or its preview."""
from pathlib import Path
import base64
import json
import re
import subprocess
import sys

source = Path(__file__).resolve().parent
repo = source.parents[3]
dist = repo / "dist"
out = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path("/tmp/eletutak-inspiracio-terv")
out.mkdir(parents=True, exist_ok=True)
base_document = (dist / "eletutak-talalkozasa/index.html").read_text()
style_tags = re.findall(r'<link\b[^>]*rel="stylesheet"[^>]*>', base_document)
assert style_tags, "Build the application before packaging the concept."
quotes = re.search(r'<section\b[^>]*id="resztvevoi-hangok"[^>]*>[\s\S]*?</section>', base_document)
assert quotes, "The existing named testimonial block must be preserved."
document = (source / "index.html").read_text().replace("<!--BASE_STYLES-->", "\n".join(style_tags))
document = document.replace("<!--CURRENT_TESTIMONIALS-->", quotes[0])
assert "<form" not in document and "<script" not in document

assets = {"/terv.css": {"type": "text/css; charset=utf-8", "body": (source / "terv.css").read_text()}}
for path in sorted((dist / "assets").glob("*.css")):
    assets["/assets/" + path.name] = {"type": "text/css; charset=utf-8", "body": path.read_text()}
for path in sorted((dist / "assets").glob("lora-*-700-normal-*")):
    assets["/assets/" + path.name] = {
        "type": "font/woff2" if path.suffix == ".woff2" else "font/woff",
        "encoding": "base64", "body": base64.b64encode(path.read_bytes()).decode(),
    }

revision = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=repo, text=True).strip()
data = {
    "html": document, "assets": assets,
    "review": {"sourceCommit": revision, "conceptOnly": True, "final": False,
               "date": "2026-11-23", "existingPreviewModified": False, "liveSiteModified": False},
}
(out / "static.txt").write_text(json.dumps(data, ensure_ascii=False))
(out / "index.html").write_text(document)
worker = r"""import source from './static.txt';
const data=JSON.parse(source);
const LIVE='https://sarkadisandor.hu';
const base={'X-Robots-Tag':'noindex, nofollow, noarchive','Referrer-Policy':'strict-origin-when-cross-origin','X-Content-Type-Options':'nosniff'};
function response(body,type='text/html; charset=utf-8',status=200,method='GET'){
 return new Response(method==='HEAD'?null:body,{status,headers:{...base,'Content-Type':type,'Cache-Control':'no-store'}});
}
export default {async fetch(request){
 const u=new URL(request.url),path=u.pathname;
 if(!['GET','HEAD'].includes(request.method))return response('Látványterv: nincs adatküldés.','text/plain; charset=utf-8',405,request.method);
 if(path==='/'||path==='/index.html'||path==='/eletutak-talalkozasa/')return response(data.html,'text/html; charset=utf-8',200,request.method);
 if(path==='/review-version.json')return response(JSON.stringify(data.review),'application/json',200,request.method);
 if(path==='/robots.txt')return response('User-agent: *\nDisallow: /\n','text/plain',200,request.method);
 if(data.assets[path]){
  const asset=data.assets[path];
  return response(asset.encoding==='base64'?Uint8Array.from(atob(asset.body),c=>c.charCodeAt(0)):asset.body,asset.type,200,request.method);
 }
 if(path.startsWith('/images/')||path.startsWith('/assets/')){
  const upstream=await fetch(LIVE+path,{method:request.method,redirect:'manual'});
  const headers=new Headers(upstream.headers);for(const[k,v]of Object.entries(base))headers.set(k,v);
  return new Response(upstream.body,{status:upstream.status,headers});
 }
 return response('Not found','text/plain',404,request.method);
}};
"""
(out / "index.mjs").write_text(worker)
(out / "manifest.json").write_text(json.dumps({
    "name": "eletutak-terv", "url": "https://eletutak-terv.kadisan.workers.dev/",
    "conceptOnly": True, "final": False, "existingPreviewModified": False,
    "liveSiteModified": False, "directory": str(out), "sourceCommit": revision,
}, indent=2))
print(json.dumps({"directory": str(out), "assets": len(assets), "conceptOnly": True,
                  "url": "https://eletutak-terv.kadisan.workers.dev/"}))
