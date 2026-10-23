#!/usr/bin/env python3
"""Generate image variants for SERVO.
Usage: python3 gen-images.py
Output: assets/img/gen/<name>-<size>.{avif,webp,jpg}
Run after placing new painting.jpg in assets/img/.
"""
import os, subprocess, sys
from PIL import Image

IMG = os.path.join(os.path.dirname(__file__), "assets", "img")
GEN = os.path.join(IMG, "gen")
os.makedirs(GEN, exist_ok=True)

JOBS = [
    ("hero",        "landscape"),
    ("ac",          "portrait"),
    ("plumbing",    "portrait"),
    ("electrical",  "portrait"),
    ("cleaning",    "portrait"),
    ("pest",        "portrait"),
    ("carpentry",   "portrait"),
    ("moving",      "portrait"),
    ("specialized", "portrait"),
    ("join",        "landscape"),
    # add ("painting", "portrait") here once painting.jpg is available
]

def process(name, kind):
    src = os.path.join(IMG, f"{name}.jpg")
    if not os.path.exists(src):
        print(f"  SKIP {name} — {name}.jpg not found", file=sys.stderr)
        return
    im = Image.open(src).convert("RGB")
    print(f"--- {name} ({kind}) source {im.size}")
    for w in (480, 960, 1600):
        if kind == "portrait":
            w2, h2 = w, w * 5 // 4
        else:
            h2 = round(w * im.height / im.width / 2) * 2
            w2 = w
        resized = im.resize((w2, h2), Image.LANCZOS)

        # WebP
        resized.save(os.path.join(GEN, f"{name}-{w}.webp"), "WEBP", quality=78, method=5)
        # JPEG fallback
        resized.save(os.path.join(GEN, f"{name}-{w}.jpg"), "JPEG", quality=82, optimize=True, progressive=True)

        # AVIF via heif-enc (JPEG intermediate, heif-enc needs -A for AVIF)
        tmp_jpg = os.path.join(GEN, f"tmp-{name}-{w}.jpg")
        resized.save(tmp_jpg, "JPEG", quality=95)
        out_avif = os.path.join(GEN, f"{name}-{w}.avif")
        r = subprocess.run(
            ["heif-enc", "-A", "-q", "30", tmp_jpg, "-o", out_avif],
            capture_output=True
        )
        os.remove(tmp_jpg)
        if r.returncode == 0 and os.path.exists(out_avif) and os.path.getsize(out_avif) > 0:
            print(f"  {w}: avif {os.path.getsize(out_avif)//1024}KB")
        else:
            print(f"  {w}: AVIF skipped ({r.stderr.decode()[:80].strip() or 'no output'})")

if __name__ == "__main__":
    for name, kind in JOBS:
        process(name, kind)
    print("DONE — painting.jpg still missing; add it then re-run this script.")
