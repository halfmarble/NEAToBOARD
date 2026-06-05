# Regenerate defensive_publication.pdf from the markdown source.
#
# This is the exact recipe used to produce the PDF deposited on Zenodo
# (DOI 10.5281/zenodo.20558155). The PDF is committed for convenience; run
# `make pdf` to reproduce it from DEFENSIVE_PUBLICATION.md + style.css.
#
# Requirements:
#   - pandoc            (markdown -> self-contained HTML)
#   - a headless Chrome/Chromium  (HTML -> PDF; no LaTeX needed)
#
# On a non-macOS host, or if Chrome lives elsewhere, override CHROME, e.g.:
#   make pdf CHROME=chromium
#   make pdf CHROME=/usr/bin/google-chrome

SRC   := DEFENSIVE_PUBLICATION.md
CSS   := style.css
HTML  := defensive_publication.html
PDF   := defensive_publication.pdf
TITLE := Defensive Publication 10.5281/zenodo.20558155

CHROME ?= /Applications/Google Chrome.app/Contents/MacOS/Google Chrome

.PHONY: pdf clean
pdf: $(PDF)

$(PDF): $(SRC) $(CSS)
	pandoc $(SRC) --standalone --embed-resources -V pagetitle="$(TITLE)" -c $(CSS) -o $(HTML)
	"$(CHROME)" --headless=new --disable-gpu --no-pdf-header-footer \
		--print-to-pdf="$(PDF)" "file://$(CURDIR)/$(HTML)"
	rm -f $(HTML)

clean:
	rm -f $(HTML) $(PDF)
