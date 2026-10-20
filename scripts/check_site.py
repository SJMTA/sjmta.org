#!/usr/bin/env python3
"""Check local HTML/CSS references and basic page structure without dependencies.

Run from any directory: python3 scripts/check_site.py
External URLs are intentionally not requested; this is an offline site check.
"""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGES = [ROOT / 'index.html', *sorted((ROOT / 'src/pages').glob('*.html'))]
errors = []


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids = set()
        self.references = []
        self.main_count = 0
        self.h1_count = 0
        self.has_language = False
        self.feed(path.read_text(encoding='utf-8'))

    def error(self, message):
        errors.append(f'{self.path.relative_to(ROOT)}:{self.getpos()[0]}: {message}')

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html':
            self.has_language = bool(attrs.get('lang'))
        if tag == 'main':
            self.main_count += 1
        if tag == 'h1':
            self.h1_count += 1
        if 'id' in attrs:
            if attrs['id'] in self.ids:
                self.error(f'duplicate ID: {attrs["id"]}')
            self.ids.add(attrs['id'])
        if any(name.startswith('on') for name in attrs):
            self.error('move inline event handlers into src/scripts/')
        if tag == 'style' or 'style' in attrs:
            self.error('move styles into src/styles/')
        if tag == 'img' and 'alt' not in attrs:
            self.error('image is missing alternative text')
        if tag == 'iframe' and not attrs.get('title'):
            self.error('iframe is missing a title')
        for name in ('src', 'href'):
            if attrs.get(name):
                self.references.append(attrs[name])


def local_target(source, reference):
    """Return a file and optional anchor; ignore external and data URLs."""
    url = urlsplit(reference)
    if url.scheme or url.netloc:
        return None
    path = unquote(url.path)
    target = ROOT / path.lstrip('/') if path.startswith('/') else source.parent / path
    if not path:
        target = source
    target = target.resolve()
    if not target.is_relative_to(ROOT):
        errors.append(f'{source.relative_to(ROOT)}: reference leaves repository: {reference}')
        return None
    if target.is_dir():
        target /= 'index.html'
    return target, unquote(url.fragment)


def check_reference(source, reference, pages):
    result = local_target(source, reference)
    if result is None:
        return
    target, anchor = result
    if not target.is_file():
        errors.append(f'{source.relative_to(ROOT)}: missing local file: {reference}')
    elif anchor and target in pages and anchor not in pages[target].ids:
        errors.append(f'{source.relative_to(ROOT)}: missing HTML anchor: {reference}')


def main():
    pages = {path: Page(path) for path in PAGES}
    for path, page in pages.items():
        if not page.has_language or page.main_count != 1 or page.h1_count != 1:
            errors.append(f'{path.relative_to(ROOT)}: expected lang, one main, and one h1')
        for reference in page.references:
            check_reference(path, reference, pages)
    styles = sorted((ROOT / 'src/styles').rglob('*.css'))
    for path in styles:
        css = re.sub(r'/\*.*?\*/', '', path.read_text(), flags=re.S)
        for match in re.finditer(r'url\(\s*[\'"]?([^\)\'"\s]+)[\'"]?\s*\)', css):
            check_reference(path, match[1], pages)
    if errors:
        print('\n'.join(errors), file=sys.stderr)
        return 1
    print(f'Checked {len(pages)} pages and {len(styles)} stylesheets: local files, anchors, and page structure passed.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
