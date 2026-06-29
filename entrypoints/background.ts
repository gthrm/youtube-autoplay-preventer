export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === "install" || details.reason === "update") {
      const manifest = browser.runtime.getManifest();
      const currentVersion = manifest.version;

      try {
        const result = await browser.storage.local.get(["lastShownVersion"]);
        if (result.lastShownVersion !== currentVersion) {
          await browser.storage.local.set({ lastShownVersion: currentVersion });
          await browser.tabs.create({
            url: browser.runtime.getURL("/whats-new.html" as any),
          });
        }
      } catch (error) {
        console.log("Error opening whats-new page:", error);
      }

      try {
        const { donatePromptShown } = await browser.storage.local.get([
          "donatePromptShown",
        ]);
        if (!donatePromptShown) {
          await browser.storage.local.set({ donatePromptShown: true });
          await browser.tabs.create({
            url: browser.runtime.getURL("/donate.html" as any),
          });
        }
      } catch (error) {
        console.log("Error opening donate page:", error);
      }
    }
  });
});
