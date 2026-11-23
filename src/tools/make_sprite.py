"""Extract the icons the site uses from the repo's icon fonts into one SVG sprite.
usage: python src/tools/make_sprite.py . images/icons.svg   (needs: pip install fonttools brotli)
"""
import json, sys, os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

repo, out = sys.argv[1], sys.argv[2]

BI = {  # sprite id -> bootstrap-icons name
    'whatsapp': 'whatsapp', 'facebook': 'facebook', 'instagram': 'instagram', 'linkedin': 'linkedin',
    'tiktok': 'tiktok', 'phone': 'telephone', 'mail': 'envelope', 'pin': 'geo-alt', 'compass': 'compass',
    'award': 'award', 'patch-check': 'patch-check', 'bank': 'bank', 'briefcase': 'briefcase', 'people': 'people',
    'house': 'house', 'houses': 'houses', 'chart': 'graph-up-arrow', 'diagram': 'diagram-3', 'workspace': 'person-workspace',
    'shield-check': 'shield-check', 'shield-lock': 'shield-lock', 'stopwatch': 'stopwatch', 'arrow-right': 'arrow-right',
    'arrow-left': 'arrow-left', 'arrow-up-right': 'arrow-up-right', 'chevron': 'chevron-right', 'menu': 'list', 'close': 'x-lg',
    'sun': 'sun', 'moon': 'moon', 'translate': 'translate', 'search': 'search', 'clock': 'clock', 'calendar': 'calendar3',
    'journal': 'journal-bookmark', 'trophy': 'trophy', 'question': 'question-circle', 'building': 'building',
    'people-fill': 'people-fill', 'shield': 'shield-shaded', 'send': 'send-check', 'check-circle': 'check2-circle',
    'globe': 'globe2', 'chat': 'chat-dots', 'person': 'person', 'card-text': 'card-text', 'activity': 'activity',
    'external': 'box-arrow-up-right', 'bolt': 'lightning-charge', 'doc': 'file-earmark-text', 'signpost': 'signpost-split',
    'clipboard': 'clipboard-check', 'arrow-up': 'arrow-up', 'cpu': 'cpu', 'bookmark': 'bookmark', 'terminal': 'terminal',
}
FA = {  # sprite id -> FA solid codepoint
    'gavel': 0xf0e3, 'scale': 0xf24e, 'handcuffs': 0xe4f8, 'landmark': 0xf66f, 'handshake': 0xf2b5,
    'family': 0xe537, 'file-signature': 0xf573,
}

def glyph_symbol(font, codepoint, sid):
    cmap = font.getBestCmap()
    gname = cmap[codepoint]
    gs = font.getGlyphSet()
    upm = font['head'].unitsPerEm
    asc = font['hhea'].ascent
    desc = font['hhea'].descent
    glyph = gs[gname]
    adv = glyph.width
    pen = SVGPathPen(gs)
    # flip y: font units are y-up
    tpen = TransformPen(pen, (1, 0, 0, -1, 0, asc))
    glyph.draw(tpen)
    d = pen.getCommands()
    h = asc - desc
    # square viewBox, centre horizontally
    size = max(adv, h)
    ox = (size - adv) / 2
    oy = (size - h) / 2
    return f'<symbol id="i-{sid}" viewBox="{-ox:.0f} {-oy:.0f} {size:.0f} {size:.0f}"><path d="{d}"/></symbol>'

bi_font = TTFont(os.path.join(repo, 'src/tools/icon-sources/bootstrap-icons.woff2'))
bi_map = json.load(open(os.path.join(repo, 'src/tools/icon-sources/bootstrap-icons.json')))
fa_font = TTFont(os.path.join(repo, 'src/tools/icon-sources/fa-solid-900.woff2'))

symbols = [glyph_symbol(bi_font, bi_map[n], sid) for sid, n in BI.items()]
symbols += [glyph_symbol(fa_font, cp, sid) for sid, cp in FA.items()]
svg = '<svg xmlns="http://www.w3.org/2000/svg">' + ''.join(symbols) + '</svg>\n'
open(out, 'w', encoding='utf-8').write(svg)
print(len(symbols), 'icons,', len(svg) // 1024, 'KB')
