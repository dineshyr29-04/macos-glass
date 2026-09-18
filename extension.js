import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Shell from 'gi://Shell';

export default class MacOSGlassExtension extends Extension {
    enable() {
        console.log('[macOS-Glass] Enabling Extension...');

        // 1. Add scoped CSS class to UI root FIRST so CSS applies guaranteed
        try {
            Main.uiGroup.add_style_class_name('macos-glass-active');
        } catch (e) {
            console.error('[macOS-Glass] Error adding CSS class:', e);
        }

        // 2. Safely attach Mutter GPU Background Blur Effect
        try {
            this._blurEffect = new Shell.BlurEffect({
                mode: Shell.BlurMode.BACKGROUND
            });

            // Set valid properties for GNOME Shell 50
            try { this._blurEffect.brightness = 0.75; } catch (e) {}
            try { this._blurEffect.blur_radius = 35; } catch (e) {}

            if (Main.panel.statusArea.quickSettings && Main.panel.statusArea.quickSettings.menu) {
                Main.panel.statusArea.quickSettings.menu.actor.add_effect(this._blurEffect);
            }
        } catch (e) {
            console.warn('[macOS-Glass] Blur effect attachment warning:', e);
        }
    }

    disable() {
        console.log('[macOS-Glass] Disabling Extension...');
        try {
            if (this._blurEffect && Main.panel.statusArea.quickSettings && Main.panel.statusArea.quickSettings.menu) {
                Main.panel.statusArea.quickSettings.menu.actor.remove_effect(this._blurEffect);
            }
        } catch (e) {}

        try {
            Main.uiGroup.remove_style_class_name('macos-glass-active');
        } catch (e) {}
    }
}
