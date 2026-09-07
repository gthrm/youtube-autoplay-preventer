interface YTActionEvent extends Event {
  detail: {
    actionName: string;
    [key: string]: any;
  };
}

// Containers that can start a hover preview. YouTube keeps renaming these, so
// both the Polymer (`ytd-*`) and the newer view-model markup are listed.
const HOVER_TARGET_SELECTOR = [
  // Home / search / channel grids
  "ytd-thumbnail",
  "ytd-rich-item-renderer",
  "ytd-rich-grid-media",
  "ytd-video-renderer",
  "ytd-grid-video-renderer",
  // Watch page sidebar ("Up next" and recommendations)
  "ytd-compact-video-renderer",
  "ytd-compact-radio-renderer",
  "ytd-playlist-panel-video-renderer",
  // View-model markup used by the sidebar and grids since 2025
  "yt-lockup-view-model",
  "yt-thumbnail-view-model",
  "yt-collection-thumbnail-view-model",
].join(", ");

// Places where the inline preview <video> can live. Deliberately excludes the
// real watch/Shorts players so playback is never touched.
const PREVIEW_ROOT_SELECTOR = [
  "ytd-video-preview",
  "#video-preview",
  "ytd-thumbnail",
  "yt-thumbnail-view-model",
  "ytd-moving-thumbnail-renderer",
  "yt-inline-player-view-model",
].join(", ");

// Matches yt-open-video-preview-action and the renamed variants YouTube ships
// from time to time, without matching the "close" counterparts.
const OPEN_PREVIEW_ACTION = /^yt-open-.*preview.*-action$/;

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  main() {
    let isEnabled: boolean = true;
    let isBlockAutoplay: boolean = true;
    let hoverBlockingStarted: boolean = false;
    let autoplayBlockingStarted: boolean = false;

    // Firefox compatibility: try-catch for storage API
    try {
      // Load settings - Firefox prefers Promise-based API
      const loadSettings = async () => {
        try {
          const result = await browser.storage.sync.get(["enabled", "blockAutoplay"]);
          isEnabled = result.enabled !== false;
          isBlockAutoplay = result.blockAutoplay !== false;
          if (isEnabled) {
            blockHoverPreviews();
          }
          if (isBlockAutoplay) {
            blockAutoplayAfterVideo();
          }
        } catch (error) {
          console.log("Storage get error, using default settings:", error);
          blockHoverPreviews(); // Default to enabled
          blockAutoplayAfterVideo(); // Default to enabled
        }
      };

      loadSettings();

      // Listen for settings changes
      browser.storage.onChanged.addListener(function (changes) {
        if (changes.enabled) {
          isEnabled = !!changes.enabled.newValue;
        }
        if (changes.blockAutoplay) {
          isBlockAutoplay = !!changes.blockAutoplay.newValue;
        }
      });
    } catch (error) {
      console.log("Storage API error, using default settings:", error);
      blockHoverPreviews(); // Default to enabled
      blockAutoplayAfterVideo(); // Default to enabled
    }

    function blockHoverPreviews() {
      if (hoverBlockingStarted) return;
      hoverBlockingStarted = true;

      document.addEventListener(
        "yt-action",
        function (event: Event) {
          if (!isEnabled) return;

          const ytEvent = event as YTActionEvent;
          if (
            ytEvent.detail &&
            OPEN_PREVIEW_ACTION.test(ytEvent.detail.actionName)
          ) {
            event.stopImmediatePropagation();
            event.preventDefault();
            console.log("🚫 Blocked hover preview", ytEvent.detail.actionName);
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

            const target = (mouseEvent.target as Element).closest?.(
              HOVER_TARGET_SELECTOR
            );
            if (target && !mouseEvent.buttons) {
              event.stopImmediatePropagation();
              console.log("🚫 Blocked hover event");
            }
          },
          true
        );
      });

      // Safety net: if YouTube still manages to attach a preview player
      // (markup we do not know about yet), silence and pause it.
      watchForPreviewVideos();

      const style = document.createElement("style");
      style.textContent = `
            ytd-thumbnail video,
            ytd-moving-thumbnail-renderer video,
            yt-thumbnail-view-model video,
            yt-inline-player-view-model video,
            ytd-video-preview video,
            #video-preview video {
                display: none !important;
            }
            ytd-thumbnail-overlay-time-status-renderer,
            ytd-thumbnail-overlay-resume-playback-renderer {
                display: none !important;
            }
        `;
      (document.head || document.documentElement).appendChild(style);
    }

    function stopPreviewVideo(video: HTMLVideoElement) {
      if (!isEnabled) return;
      if (!video.closest(PREVIEW_ROOT_SELECTOR)) return;

      video.muted = true;
      video.autoplay = false;
      video.pause();
      video.addEventListener("play", () => {
        if (isEnabled) {
          video.muted = true;
          video.pause();
        }
      });
      console.log("🚫 Stopped preview video");
    }

    function watchForPreviewVideos() {
      document
        .querySelectorAll<HTMLVideoElement>("video")
        .forEach(stopPreviewVideo);

      const observer = new MutationObserver((mutations) => {
        if (!isEnabled) return;

        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (!(node instanceof Element)) continue;

            if (node instanceof HTMLVideoElement) {
              stopPreviewVideo(node);
            } else {
              node
                .querySelectorAll?.<HTMLVideoElement>("video")
                .forEach(stopPreviewVideo);
            }
          }
        }
      });

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    }

    function blockAutoplayAfterVideo() {
      if (autoplayBlockingStarted) return;
      autoplayBlockingStarted = true;

      document.addEventListener(
        "yt-navigate",
        function (event: Event) {
          if (!isBlockAutoplay) return;

          const detail = (event as CustomEvent).detail;
          if (detail?.tempData?.autonav === "1") {
            event.stopImmediatePropagation();
            event.preventDefault();
            console.log("🚫 Blocked autoplay after video");
            return false;
          }
        },
        true
      );
    }

    console.log("YouTube Autoplay Preventer: Extension loaded");
  },
});
