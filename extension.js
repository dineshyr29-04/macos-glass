import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Shell from 'gi://Shell';

export default class MacOSGlassExtension extends Extension {
    enable() {
        console.log('[macOS-Glass] Extension Enabled with Native Shell.BlurEffect');

        // Create native Mutter GPU Background Blur Effect
        this._blurEffect = new Shell.BlurEffect({
            brightness: 0.75,
            sigma: 40,
            mode: Shell.BlurMode.BACKGROUND
        });

        // Apply native blur directly to Quick Settings Menu Actor
        try {
            if (Main.panel.statusArea.quickSettings && Main.panel.statusArea.quickSettings.menu) {
                Main.panel.statusArea.quickSettings.menu.actor.add_effect(this._blurEffect);
            }
        } catch (e) {
            console.warn('[macOS-Glass] QuickSettings blur attachment warning:', e);
        }

        // Add scoped CSS class to UI root
        Main.uiGroup.add_style_class_name('macos-glass-active');
    }

    disable() {
        console.log('[macOS-Glass] Extension Disabled');
        try {
            if (this._blurEffect && Main.panel.statusArea.quickSettings && Main.panel.statusArea.quickSettings.menu) {
                Main.panel.statusArea.quickSettings.menu.actor.remove_effect(this._blurEffect);
            }
        } catch (e) {
            // Ignore on cleanup
        }
        Main.uiGroup.remove_style_class_name('macos-glass-active');
    }
}
