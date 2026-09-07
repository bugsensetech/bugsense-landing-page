#!/usr/bin/env python3
"""
Render the OpenGraph / Twitter share images (1200x630) for each locale.

Output: public/og-image-<locale>.png — committed, served as static files.
Re-run whenever the hero headline or metadata.ogDescription changes.

Usage:
    python3 scripts/og-image.py [path/to/Montserrat[wght].ttf]

Requires Pillow (pip install pillow). The Montserrat variable font is the same
family the site uses via next/font; download it from
https://github.com/google/fonts/tree/main/ofl/montserrat if it is not passed.
"""
import json
import sys
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

from brand import mark

ROOT = Path(__file__).resolve().parent.parent
W, H = 1200, 630
PAD = 80
BG_TOP, BG_BOTTOM = (0x26, 0x21, 0x5C), (0x1A, 0x17, 0x30)  # p-900 -> text
WHITE = (255, 255, 255)
ACCENT = (0x7F, 0x77, 0xDD)  # p-400


def font(path: str, size: int, weight: int) -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(path, size)
    f.set_variation_by_axes([weight])
    return f


def gradient() -> Image.Image:
    img = Image.new("RGB", (W, H))
    px = img.load()
    for y in range(H):
        for x in range(W):
            t = (x / W + y / H) / 2
            px[x, y] = tuple(round(a + (b - a) * t) for a, b in zip(BG_TOP, BG_BOTTOM))
    return img


def logo(img: Image.Image, x: int, y: int, s: int) -> None:
    """The brand mark (same geometry as public/icon.svg), white, no background."""
    m = mark(s, WHITE)
    img.paste(m, (x, y), m)


def wrap(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont, max_w: int) -> list[str]:
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(trial, font=f) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def render(locale: str, font_path: str) -> None:
    msgs = json.loads((ROOT / "messages" / f"{locale}.json").read_text())
    top, bottom = msgs["hero"]["headlineTop"], msgs["hero"]["headlineBottom"]
    desc = msgs["metadata"]["ogDescription"]

    img = gradient()
    d = ImageDraw.Draw(img)

    # Brand row
    logo(img, PAD, 60, 52)
    d.text((PAD + 70, 60 + 8), "BugSense", font=font(font_path, 32, 700), fill=WHITE)

    # Headline — shrink until both lines fit
    size = 92
    while True:
        hf = font(font_path, size, 800)
        if max(d.textlength(top, font=hf), d.textlength(bottom, font=hf)) <= W - 2 * PAD or size <= 56:
            break
        size -= 4
    line_h = int(size * 1.02)
    y = 190
    d.text((PAD - 4, y), top, font=hf, fill=WHITE)
    d.text((PAD - 4, y + line_h), bottom, font=hf, fill=ACCENT)

    # Description
    df = font(font_path, 28, 500)
    y += 2 * line_h + 36
    for line in wrap(d, desc, df, W - 2 * PAD - 40)[:3]:
        d.text((PAD, y), line, font=df, fill=(200, 198, 224))
        y += 40

    # Domain
    d.text((PAD, H - 64 - 22), "BUGSENSEDX.COM", font=font(font_path, 20, 600), fill=(150, 146, 190))

    out = ROOT / "public" / f"og-image-{locale}.png"
    img.save(out, optimize=True)
    print(f"wrote {out.relative_to(ROOT)}")


if __name__ == "__main__":
    font_arg = sys.argv[1] if len(sys.argv) > 1 else "Montserrat[wght].ttf"
    for loc in ("en", "de"):
        render(loc, font_arg)
