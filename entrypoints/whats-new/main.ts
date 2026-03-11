document.addEventListener("DOMContentLoaded", function () {
  const versionText = document.getElementById("versionText");
  if (versionText) {
    const manifest = browser.runtime.getManifest();
    versionText.textContent = `v${manifest.version}`;
  }

  document.getElementById("closeBtn")?.addEventListener("click", () => {
    window.close();
  });

  document.getElementById("githubBtn")?.addEventListener("click", () => {
    window.open(
      "https://github.com/gthrm/youtube-autoplay-preventer",
      "_blank",
      "noopener,noreferrer"
    );
  });
});
