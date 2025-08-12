interface YTActionEvent extends Event {
  detail: {
    actionName: string;
    [key: string]: any;
  };
}

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  main() {
    let isEnabled = true;

    // Firefox compatibility: try-catch for storage API
    try {
      // Load settings - Firefox prefers Promise-based API
      const loadSettings = async () => {
        try {
          const result = await browser.storage.sync.get(["enabled"]);
          isEnabled = result.enabled !== false;
          if (isEnabled) {
            blockHoverPreviews();
          }
        } catch (error) {
          console.log("Storage get error, using default settings:", error);
          blockHoverPreviews(); // Default to enabled
        }
      };
      
      loadSettings();

      // Listen for settings changes
      browser.storage.onChanged.addListener(function (changes) {
        if (changes.enabled) {
          isEnabled = changes.enabled.newValue;
        }
      });
    } catch (error) {
      console.log("Storage API error, using default settings:", error);
      blockHoverPreviews(); // Default to enabled
    }

    function blockHoverPreviews() {
      document.addEventListener(
        "yt-action",
        function (event: Event) {
          if (!isEnabled) return;

          const ytEvent = event as YTActionEvent;
          if (
            ytEvent.detail &&
            ytEvent.detail.actionName === "yt-open-video-preview-action"
          ) {
            event.stopImmediatePropagation();
            event.preventDefault();
            console.log("🚫 Blocked hover preview");
            return false;
          }
        },
        true
      );

      ["mouseenter", "mouseover"].forEach((eventType) => {
        document.addEventListener(
          eventType,
          function (event: Event) {
            if (!isEnabled) return;

            const mouseEvent = event as MouseEvent;
            if (!mouseEvent.target) return;

            const target = (mouseEvent.target as Element).closest(
              "ytd-thumbnail, ytd-rich-item-renderer, ytd-video-renderer"
            );
            if (target && !mouseEvent.buttons) {
              event.stopImmediatePropagation();
              console.log("🚫 Blocked hover event");
            }
          },
          true
        );
      });

      const style = document.createElement("style");
      style.textContent = `
            ytd-thumbnail video {
                display: none !important;
            }
            ytd-thumbnail-overlay-time-status-renderer,
            ytd-thumbnail-overlay-resume-playback-renderer {
                display: none !important;
            }
        `;
      document.head.appendChild(style);
    }

    console.log("YouTube Autoplay Preventer: Extension loaded");
  },
});
