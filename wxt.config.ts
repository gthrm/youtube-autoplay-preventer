import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    manifest_version: 3,
    name: "YouTube Autoplay Preventer - Stop Video Previews",
    version: "1.0.0",
    description:
      "Block YouTube video autoplay on hover. Save bandwidth and prevent unwanted sounds.",
    permissions: ["activeTab", "storage"],
    host_permissions: ["*://*.youtube.com/*"],
    action: {
      default_title: "YouTube Autoplay Preventer - Control Video Previews",
    },
    icons: {
      "16": "icon/icon-16.png",
      "32": "icon/icon-32.png",
      "48": "icon/icon-48.png",
      "128": "icon/icon-128.png",
    },
    // Additional SEO-friendly metadata
    homepage_url: "https://github.com/gthrm/youtube-autoplay-preventer",
    short_name: "YT Autoplay Block",
    // Firefox compatibility
    browser_specific_settings: {
      gecko: {
        id: "youtube-autoplay-preventer@cdroma.dev",
        strict_min_version: "109.0",
      },
    },
  },
  // WXT automatically detects popup entrypoints from entrypoints/popup/
  // The default_popup will be automatically set based on the popup directory
});
