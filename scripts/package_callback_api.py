"""Public API shell; Wrangler bundles the existing functions/ callback handler.

No secrets, Google IDs, or visitor records enter this generated directory.
Configure the two secrets on the sarkadi-kapcsolat production project separately.
"""
from pathlib import Path

root=Path(__file__).resolve().parents[1]
target=root/'deploy'/'callback-api'
target.mkdir(parents=True,exist_ok=True)
(target/'index.html').write_text('<!doctype html><html lang="hu"><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Sarkadi Sándor</title><a href="https://sarkadisandor.hu/">Sarkadi Sándor honlapja</a></html>\n')
(target/'robots.txt').write_text('User-agent: *\nDisallow: /\n')
(target/'_headers').write_text('/*\n  X-Robots-Tag: noindex, nofollow, noarchive\n  X-Content-Type-Options: nosniff\n')
print(f'Visszahívási API feltöltési mappája: {target}')
