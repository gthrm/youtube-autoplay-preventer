export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async (details) => {
    if (details.reason !== "install" && details.reason !== "update") return;

    try {
      const { version } = browser.runtime.getManifest();
      const { whatsNewShownFor } = await browser.storage.local.get([
        "whatsNewShownFor",
      ]);

      // Show the release page once per version: it carries both the changelog
      // and the donation section.
      if (whatsNewShownFor === version) return;

      await browser.storage.local.set({ whatsNewShownFor: version });
      await browser.tabs.create({
        url: browser.runtime.getURL("/whats-new.html" as any),
      });
    } catch (error) {
      console.log("Error opening what's new page:", error);
    }
  });
});
