"""
Shared brand-mark rendering for the icon and share-image generators.

The mark is the four quarter-discs from public/icon.svg / components/ui/logo.tsx,
drawn from the same coordinates (80.265 x 80.254 viewBox units) so every raster
asset matches the SVG exactly. Supersampled for clean anti-aliased edges.
"""
from PIL import Image, ImageDraw

INDIGO = (0x26, 0x21, 0x5C)  # p-900
WHITE = (255, 255, 255)

_VIEW_W, _VIEW_H = 80.265, 80.254
_RADIUS = 38.66
# (arc centre x, arc centre y, start angle). Each lobe is a quarter disc of
# radius 38.66 drawn from the SVG path's arc centre:
#   top lobes    — centred on the inner corner, arc bulging outward (rounded top)
#   bottom lobes — centred on the OUTER top corner, arc curving inward (the "lungs" cut-out)
_LOBES = (
    (38.67, 38.654, 180),   # top-left:     M38.67 0 V38.654 H0 A… 38.67 0
    (41.6, 38.654, 270),    # top-right:    M41.6 0 V38.654 H80.268 A… 41.6 0
    (0.0, 41.594, 0),       # bottom-left:  M0 80.254 V41.594 H38.67 A… 0 80.254
    (80.265, 41.594, 90),   # bottom-right: M80.265 80.254 V41.594 H41.6 a… 80.265 80.254
)


def mark(size: int, color=WHITE, supersample: int = 8) -> Image.Image:
    """The bare mark on a transparent background, `size` px wide."""
    ss = supersample
    k = size * ss / _VIEW_W
    r = _RADIUS * k
    layer = Image.new("RGBA", (int(_VIEW_W * k), int(_VIEW_H * k)), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for cx, cy, start in _LOBES:
        ox, oy = cx * k, cy * k
        d.pieslice([ox - r, oy - r, ox + r, oy + r], start, start + 90, fill=color + (255,))
    return layer.resize((size, round(size * _VIEW_H / _VIEW_W)), Image.LANCZOS)


def tile(size: int, padding: float = 0.14, bg=INDIGO, fg=WHITE) -> Image.Image:
    """Square app/favicon tile: the mark centred on a solid brand background."""
    img = Image.new("RGBA", (size, size), bg + (255,))
    inner = round(size * (1 - 2 * padding))
    m = mark(inner, fg)
    img.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)
    return img


def glyph(size: int, padding: float = 0.04, fg=WHITE) -> Image.Image:
    """Square favicon: the mark alone on a transparent background (GitHub-style)."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    inner = round(size * (1 - 2 * padding))
    m = mark(inner, fg)
    img.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)
    return img
