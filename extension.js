import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Shell from 'gi://Shell';

export default class MacOSGlassExtension extends Extension {
    enable() {
        console.log('[macOS-Glass] Enabling Extension with Panel & Menu Blur...');

        // 1. Add scoped CSS class to UI root
        try {
            Main.uiGroup.add_style_class_name('macos-glass-active');
        } catch (e) {
            console.error('[macOS-Glass] Error adding CSS class:', e);
        }

        // 2. Create GPU Background Blur Effect for Panel & Control Center
        try {
            this._panelBlur = new Shell.BlurEffect({ mode: Shell.BlurMode.BACKGROUND });
            try { this._panelBlur.brightness = 0.75; } catch (e) {}
            try { this._panelBlur.blur_radius = 40; } catch (e) {}

            this._menuBlur = new Shell.BlurEffect({ mode: Shell.BlurMode.BACKGROUND });
            try { this._menuBlur.brightness = 0.75; } catch (e) {}
            try { this._menuBlur.blur_radius = 40; } catch (e) {}

            // Attach blur to Top Panel actor
            if (Main.panel && Main.panel.actor) {
                Main.panel.actor.add_effect(this._panelBlur);
            }

            // Attach blur to Quick Settings Menu actor
            if (Main.panel.statusArea.quickSettings && Main.panel.statusArea.quickSettings.menu) {
                Main.panel.statusArea.quickSettings.menu.actor.add_effect(this._menuBlur);
            }
        } catch (e) {
            console.warn('[macOS-Glass] Blur effect attachment warning:', e);
        }
    }

    disable() {
        console.log('[macOS-Glass] Disabling Extension...');
        try {
            if (this._panelBlur && Main.panel && Main.panel.actor) {
                Main.panel.actor.remove_effect(this._panelBlur);
            }
            if (this._menuBlur && Main.panel.statusArea.quickSettings && Main.panel.statusArea.quickSettings.menu) {
                Main.panel.statusArea.quickSettings.menu.actor.remove_effect(this._menuBlur);
            }
        } catch (e) {}

        try {
            Main.uiGroup.remove_style_class_name('macos-glass-active');
        } catch (e) {}
    }
}
