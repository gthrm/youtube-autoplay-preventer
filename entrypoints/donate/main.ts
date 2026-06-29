document.addEventListener("DOMContentLoaded", function () {
  const versionText = document.getElementById("versionText");
  if (versionText) {
    const manifest = browser.runtime.getManifest();
    versionText.textContent = `v${manifest.version}`;
  }
});
