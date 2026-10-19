#!/usr/bin/env python3
"""
Generate every raster icon from the brand mark geometry (scripts/brand.py,
which mirrors public/icon.svg).

Browser favicons — white mark, transparent background (like GitHub's):
    src/app/favicon.ico (16/32/48/64, BMP frames)   — legacy + Safari tab icon
    public/icon-96.png, public/icon-192.png          — <link rel="icon">

App icons — white mark on the indigo tile (platforms need an opaque background:
iOS paints transparency black, Android places icons on a white disc):
    public/apple-touch-icon.png (180px)              — iOS home screen / Safari bookmarks
    public/app-icon-192.png, public/app-icon-512.png — web app manifest, JSON-LD logo

Usage: python3 scripts/icons.py   (requires Pillow)
"""
from pathlib import Path

from brand import glyph, tile

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

FAVICON_PNGS = {PUBLIC / "icon-96.png": 96, PUBLIC / "icon-192.png": 192}
APP_TILES = {
    PUBLIC / "apple-touch-icon.png": 180,
    PUBLIC / "app-icon-192.png": 192,
    PUBLIC / "app-icon-512.png": 512,
}
ICO_SIZES = [16, 32, 48, 64]


def main() -> None:
    for path, size in FAVICON_PNGS.items():
        glyph(size).save(path, optimize=True)
        print(f"wrote {path.relative_to(ROOT)} ({size}px, transparent)")

    ico = ROOT / "src" / "app" / "favicon.ico"
    glyph(256).save(ico, format="ICO", sizes=[(s, s) for s in ICO_SIZES], bitmap_format="bmp")
    print(f"wrote {ico.relative_to(ROOT)} ({', '.join(map(str, ICO_SIZES))}px, transparent)")

    for path, size in APP_TILES.items():
        tile(size).save(path, optimize=True)
        print(f"wrote {path.relative_to(ROOT)} ({size}px, indigo tile)")


if __name__ == "__main__":
    main()
