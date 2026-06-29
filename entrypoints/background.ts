export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === "install" || details.reason === "update") {
      // whats-new is intentionally not opened in this release — only the
      // donate page is shown (once ever).

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
