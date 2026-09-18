import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class MacOSGlassExtension extends Extension {
    enable() {
        console.log('[macOS-Glass] Extension Enabled');
        Main.uiGroup.add_style_class_name('macos-glass-active');
    }

    disable() {
        console.log('[macOS-Glass] Extension Disabled');
        Main.uiGroup.remove_style_class_name('macos-glass-active');
    }
}
