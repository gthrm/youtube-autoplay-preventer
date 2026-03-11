import "./style.css";

document.addEventListener("DOMContentLoaded", function () {
  const enableToggle = document.getElementById(
    "enableToggle"
  ) as HTMLInputElement;
  const autoplayToggle = document.getElementById(
    "autoplayToggle"
  ) as HTMLInputElement;
  const statusDot = document.getElementById("statusDot") as HTMLSpanElement;
  const statusText = document.getElementById("statusText") as HTMLSpanElement;
  const versionText = document.getElementById(
    "versionText"
  ) as HTMLParagraphElement;

  // Set version from runtime
  const manifest = browser.runtime.getManifest();
  versionText.textContent = `v${manifest.version}`;

  // Firefox compatibility: use Promise-based API with fallback
  const loadSettings = async () => {
    try {
      const result = await browser.storage.sync.get(["enabled", "blockAutoplay"]);
      const isEnabled = result.enabled !== false;
      const isBlockAutoplay = result.blockAutoplay !== false;
      enableToggle.checked = isEnabled;
      autoplayToggle.checked = isBlockAutoplay;
      updateStatus(isEnabled);
    } catch (error) {
      console.log("Storage get error:", error);
      enableToggle.checked = true;
      autoplayToggle.checked = true;
      updateStatus(true);
    }
  };

  loadSettings();

  const reloadYouTubeTabs = async () => {
    try {
      const tabs = await browser.tabs.query({ url: "*://*.youtube.com/*" });
      for (const tab of tabs) {
        if (tab.id) {
          browser.tabs.reload(tab.id);
        }
      }
    } catch (tabError) {
      console.log("Tab reload error (may be expected in Firefox):", tabError);
    }
  };

  enableToggle.addEventListener("change", async function () {
    const isEnabled = enableToggle.checked;
    try {
      await browser.storage.sync.set({ enabled: isEnabled });
      updateStatus(isEnabled);
      await reloadYouTubeTabs();
    } catch (error) {
      console.log("Storage set error:", error);
    }
  });

  autoplayToggle.addEventListener("change", async function () {
    const isBlockAutoplay = autoplayToggle.checked;
    try {
      await browser.storage.sync.set({ blockAutoplay: isBlockAutoplay });
      await reloadYouTubeTabs();
    } catch (error) {
      console.log("Storage set error:", error);
    }
  });

  function updateStatus(isEnabled: boolean) {
    if (isEnabled) {
      statusDot.className = "status-dot active";
      statusText.textContent = "Active";
    } else {
      statusDot.className = "status-dot inactive";
      statusText.textContent = "Disabled";
    }
  }
});
