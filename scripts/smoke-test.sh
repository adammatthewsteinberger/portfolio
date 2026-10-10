#!/usr/bin/env bash
# Post-deploy smoke test: does the deployed site actually serve its content?
#
# Status codes alone are not enough. Once, every route returned 200 while the
# prerendered cache never hit: the blog index and the feed came back empty and
# Markdown-backed pages 404ed. So this checks content: feeds have items, and
# real pages found through the live feeds and sitemap return 200 with a heading.
# Test pages are discovered, not hard-coded, so renaming a post cannot break it.
#
# A fresh deploy can take a moment to answer, so each check retries.
#
# usage:  scripts/smoke-test.sh <base-url>
#         SMOKE_ATTEMPTS=3 SMOKE_DELAY=2 scripts/smoke-test.sh https://example.com
set -u

BASE="${1:?usage: smoke-test.sh <base-url>}"
BASE="${BASE%/}"
ATTEMPTS="${SMOKE_ATTEMPTS:-12}"
DELAY="${SMOKE_DELAY:-10}"

failed=0

fetch() { curl -fsS --max-time 20 "${BASE}$1"; }

# retry <description> <command...>: run until it succeeds or attempts run out.
retry() {
  local what="$1"
  shift
  local attempt
  for ((attempt = 1; attempt <= ATTEMPTS; attempt++)); do
    if "$@"; then
      echo "ok    ${what}"
      return 0
    fi
    if ((attempt < ATTEMPTS)); then sleep "${DELAY}"; fi
  done
  echo "FAIL  ${what}"
  failed=1
  return 1
}

# feed_has_items <path> <minimum>
feed_has_items() {
  local count
  count="$(fetch "$1" 2>/dev/null | grep -c '<item>')"
  [ "${count:-0}" -ge "$2" ]
}

# page_ok <path>: 200 (curl -f fails on 4xx/5xx) and the page has a heading.
page_ok() {
  fetch "$1" 2>/dev/null | grep -q '<h1'
}

# first_path <xml-path> <tag> <pattern>: the first <tag> URL matching the
# pattern, reduced to a path. Feed links name the production host even on the
# preview site, so the host is stripped and the path is requested from BASE.
first_path() {
  fetch "$1" 2>/dev/null \
    | grep -o "<$2>[^<]*</$2>" \
    | sed -E "s#</?$2>##g; s#^https?://[^/]+##" \
    | grep -m1 -E "$3"
}

# check_page <label> <xml-path> <tag> <pattern>
check_page() {
  local path
  path="$(first_path "$2" "$3" "$4")"
  if [ -z "${path}" ]; then
    echo "FAIL  ${1}: no URL matching ${4} found in ${2}"
    failed=1
    return
  fi
  retry "${1} (${path}) returns 200 with a heading" page_ok "${path}"
}

echo "smoke test: ${BASE}"

retry "/feed.xml has items" feed_has_items /feed.xml 10
retry "/essays/feed.xml has items" feed_has_items /essays/feed.xml 1

check_page "a blog post" /feed.xml link '/blog/'
check_page "an essay" /essays/feed.xml link '/essays/'
check_page "a Novice to Navigator article" /sitemap.xml loc '/novice-to-navigator/[a-z]'
check_page "a case study" /sitemap.xml loc '/work/[a-z]'

if ((failed)); then
  echo "smoke test FAILED for ${BASE}"
  exit 1
fi
echo "smoke test passed for ${BASE}"
