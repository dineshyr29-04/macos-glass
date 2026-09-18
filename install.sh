#!/usr/bin/env bash
set -e

UUID="macos-glass@dineshyr29-04"
DEST_DIR="$HOME/.local/share/gnome-shell/extensions/$UUID"

echo " Installing macOS Glass extension into $DEST_DIR..."
mkdir -p "$DEST_DIR"
cp -r metadata.json extension.js stylesheet.css "$DEST_DIR/"

echo " Enabling extension..."
gnome-extensions enable "$UUID" 2>/dev/null || true

echo " Done! Extension installed and enabled."
