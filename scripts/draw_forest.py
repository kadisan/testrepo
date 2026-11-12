from PIL import Image,ImageDraw,ImageFilter
from pathlib import Path
import random, math
random.seed(37)
w,h=1920,1250
im=Image.new('RGB',(w,h),(6,25,19)); d=ImageDraw.Draw(im)
# Original canopy illustration; no stock photographs.
for y in range(-100,h+120,115):
 for x in range(-100,w+120,120):
  cx=x+random.randint(-65,65);cy=y+random.randint(-55,55);r=random.randint(75,135)
  color=random.choice([(38,76,43),(25,74,47),(30,86,55),(48,87,42),(27,63,43),(42,89,48)])
  d.ellipse((cx-r,cy-r,cx+r,cy+r),fill=(5,22,16))
  for k in range(150):
   a=random.random()*math.tau;dist=math.sqrt(random.random())*r*.9; xx=cx+math.cos(a)*dist;yy=cy+math.sin(a)*dist;rr=random.randint(12,29)
   light=(1-dist/r)*.25+(cx-xx)/r*.25+random.uniform(-.2,.15)
   col=tuple(max(0,min(255,int(v*(.75+light)))) for v in color)
   d.ellipse((xx-rr,yy-rr*.75,xx+rr,yy+rr*.75),fill=col)
  for k in range(1450):
   a=random.random()*math.tau;dist=math.sqrt(random.random())*r*.93;xx=cx+math.cos(a)*dist; yy=cy+math.sin(a)*dist;rr=random.uniform(.7,2.7)
   light=(1-dist/r)*.45+(cx-xx)/r*.22+random.uniform(-.32,.5)
   col=tuple(max(0,min(255,int(v*(.85+light)))) for v in color)
   d.ellipse((xx-rr,yy-rr*.55,xx+rr,yy+rr*.55),fill=col)
im=im.filter(ImageFilter.GaussianBlur(.35)); im.save(Path(__file__).resolve().parents[1] / 'public' / 'forest-canopy.webp',quality=91)
