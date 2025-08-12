# YouTube Autoplay Preventer - Stop Video Previews

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Available-brightgreen)](https://github.com/gthrm/youtube-autoplay-preventer)
[![Firefox Add-ons](https://img.shields.io/badge/Firefox%20Add--ons-Available-orange)](https://github.com/gthrm/youtube-autoplay-preventer)

## 🚫 Block YouTube Video Autoplay on Hover

**YouTube Autoplay Preventer** is a powerful browser extension that **blocks YouTube videos from auto-playing when you hover over thumbnails**. Say goodbye to unwanted video previews, annoying sounds, and wasted bandwidth!

### 🎯 Key Features

- ✅ **Block YouTube Autoplay**: Prevents videos from auto-playing when hovering over thumbnails
- ✅ **Stop Unwanted Sounds**: No more sudden audio interruptions while browsing
- ✅ **Save Bandwidth**: Reduces data usage by blocking unnecessary video loading
- ✅ **Improve Performance**: Faster YouTube browsing experience
- ✅ **Enhanced Privacy**: Prevents unwanted video tracking and data collection
- ✅ **Easy Toggle**: Simple on/off control from the extension popup
- ✅ **Cross-Browser Support**: Works on Chrome, Firefox, and Edge

### 🚀 Why Use YouTube Autoplay Preventer?

#### Problems This Extension Solves:

- **Annoying Auto-Play**: YouTube videos start playing when you accidentally hover over them
- **Unwanted Sounds**: Sudden audio interruptions while browsing or working
- **Bandwidth Waste**: Videos loading unnecessarily, consuming your data
- **Performance Issues**: Slower browsing due to multiple videos loading
- **Distraction**: Video previews breaking your focus and concentration
- **Privacy Concerns**: Unwanted video tracking and data collection

#### Benefits You'll Get:

- 🔇 **Peaceful Browsing**: No more unexpected sounds or video interruptions
- ⚡ **Faster Performance**: Improved YouTube loading speed and responsiveness
- 💾 **Data Savings**: Reduced bandwidth usage, especially important on mobile
- 🎯 **Better Focus**: Browse YouTube without distracting video previews
- 🛡️ **Enhanced Privacy**: Less unwanted tracking and data collection
- 🧘 **Stress-Free Experience**: Enjoy a calmer, more controlled YouTube browsing

### 📦 Installation

#### Chrome Web Store

1. Visit the [Chrome Web Store page](#) (coming soon)
2. Click "Add to Chrome"
3. Confirm installation
4. Start browsing YouTube without autoplay!

#### Firefox Add-ons

1. Visit the [Firefox Add-ons page](#) (coming soon)
2. Click "Add to Firefox"
3. Confirm installation
4. Enjoy distraction-free YouTube browsing!

#### Manual Installation (Development)

1. Clone this repository:

   ```bash
   git clone https://github.com/gthrm/youtube-autoplay-preventer.git
   cd youtube-autoplay-preventer
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build the extension:

   ```bash
   pnpm build
   ```

4. Load the extension in your browser:
   - **Chrome**: Go to `chrome://extensions/`, enable Developer mode, click "Load unpacked", select the `dist` folder
   - **Firefox**: Go to `about:debugging`, click "This Firefox", click "Load Temporary Add-on", select any file in the `dist` folder

### 🛠️ How It Works

The extension uses advanced content script injection to:

1. **Detect YouTube Pages**: Automatically activates on all YouTube domains
2. **Block Hover Events**: Intercepts and prevents autoplay triggers
3. **Stop Video Loading**: Prevents unnecessary video data from loading
4. **Maintain User Control**: Allows manual video playback when desired
5. **Preserve YouTube Functionality**: Keeps all other YouTube features intact

### ⚙️ Usage

1. **Install the Extension**: Follow the installation instructions above
2. **Visit YouTube**: Go to youtube.com and browse normally
3. **Hover Over Thumbnails**: Notice that videos no longer auto-play
4. **Toggle On/Off**: Click the extension icon to enable/disable the feature
5. **Enjoy Peaceful Browsing**: Experience YouTube without unwanted interruptions

### 🎨 Features in Detail

#### Smart Autoplay Blocking

- Prevents the `yt-open-video-preview-action` event
- Blocks mouse hover events on video thumbnails
- Maintains normal clicking functionality
- Works with all YouTube layouts and themes

#### Bandwidth Optimization

- Stops unnecessary video preloading
- Reduces data usage significantly
- Improves page loading speeds
- Perfect for mobile and limited data plans

#### Privacy Enhancement

- Prevents unwanted video tracking
- Reduces data collection from accidental hovers
- Maintains your browsing privacy
- No data is collected by this extension

#### User Experience

- Clean, modern popup interface
- Visual status indicators
- One-click enable/disable toggle
- Automatic settings persistence

### 🔧 Technical Details

- **Framework**: Built with [WXT](https://wxt.dev/) for modern extension development
- **TypeScript**: Fully typed for reliability and maintainability
- **Manifest V3**: Uses the latest extension API standards
- **Cross-Browser**: Compatible with Chromium and Firefox browsers
- **Lightweight**: Minimal resource usage and fast performance
- **Secure**: No external connections or data collection

### 📊 Keywords & SEO

This extension helps with:

- YouTube autoplay blocking
- Video preview prevention
- Bandwidth saving browser extension
- YouTube enhancement tools
- Video autoplay blocker
- YouTube privacy extension
- Distraction-free YouTube browsing
- YouTube productivity tools
- Video hover prevention
- YouTube user experience improvement

### 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the Repository**: Create your own fork of the project
2. **Create a Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Make Changes**: Improve the code or add new features
4. **Test Thoroughly**: Ensure everything works as expected
5. **Submit a Pull Request**: Share your improvements with the community

### 📝 Development Setup

```bash
# Clone the repository
git clone https://github.com/gthrm/youtube-autoplay-preventer.git
cd youtube-autoplay-preventer

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Create extension packages
pnpm zip
```

### 🐛 Bug Reports & Feature Requests

Found a bug or have an idea for improvement?

- **Bug Reports**: [Open an issue](https://github.com/gthrm/youtube-autoplay-preventer/issues) with detailed reproduction steps
- **Feature Requests**: [Create a feature request](https://github.com/gthrm/youtube-autoplay-preventer/issues) explaining your use case
- **Questions**: Check the [FAQ](#) or start a [discussion](https://github.com/gthrm/youtube-autoplay-preventer/discussions)

### 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 🙏 Acknowledgments

- Thanks to the [WXT](https://wxt.dev/) team for the excellent extension framework
- Inspired by the need for a better YouTube browsing experience
- Built with ❤️ for the YouTube community

### 🔗 Related Projects

- [YouTube Enhancement Suite](https://github.com/YePpHa/YouTubeCenter)
- [uBlock Origin](https://github.com/gorhill/uBlock) - General content blocker
- [Video Speed Controller](https://github.com/igrigorik/videospeed) - Video playback control

---

**Made with ❤️ by [cdROma](https://github.com/gthrm)**

**⭐ Star this repository if it helped you! ⭐**
