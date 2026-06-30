# Focus Mode Chrome Extension

A powerful Chrome extension designed to help you stay focused and productive by blocking distracting websites, hiding noisy feeds, and providing a built-in Pomodoro timer with motivational quotes.

## Features

- **🚫 Website Blocking**: Block distracting social media sites (Facebook, Twitter, Reddit) with a single toggle
- **⏱️ Pomodoro Timer**: Built-in 25-minute focus timer to structure your work sessions
- **💭 Motivational Quotes**: Get inspired with daily quotes to keep you motivated
- **🎨 Clean UI**: Simple, intuitive popup interface for easy control
- **📱 Feed Hiding**: Automatically hides noisy feeds on YouTube and Instagram (when enabled)
- **💾 Persistent Settings**: Your preferences are saved across browser sessions

## Installation

### From Source (Development)

1. Clone this repository or download the files
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked**
5. Select the folder containing the extension files
6. The Focus Mode extension will now appear in your Chrome toolbar

### Manual Installation

1. Download all files from this repository
2. Follow steps 2-6 above

## Usage

### Enabling Focus Mode

1. Click the Focus Mode icon in your Chrome toolbar
2. Toggle **Enable Focus Mode** to activate website blocking
3. The following sites will be blocked:
   - Facebook
   - Twitter
   - Reddit

### Using the Pomodoro Timer

1. Click **Start** to begin a 25-minute focus session
2. Click **Pause** to pause the timer
3. Click **Reset** to restart the timer
4. The timer runs even when the popup is closed

### Viewing Quotes

- A new motivational quote appears each time you open the popup
- Quotes are designed to keep you focused and motivated

## File Structure

```
chrome-Extension/
├── manifest.json       # Chrome extension configuration
├── popup.html         # Popup UI
├── popup.css          # Popup styling
├── popup.js           # Popup functionality
├── background.js      # Background service worker (blocking logic)
├── content.js         # Content script for feed hiding
└── README.md          # This file
```

## Technical Details

### Manifest Version
- **Version**: 3 (Latest Chrome extension standard)
- **Current Release**: 1.0.0

### Permissions Used
- `storage`: Save and retrieve user preferences
- `tabs`: Manage browser tabs
- `declarativeNetRequest`: Block websites without impacting performance

### Blocked Websites
The extension blocks access to:
- facebook.com
- twitter.com
- reddit.com

You can modify `background.js` to add or remove blocked sites.

## How It Works

1. **Background Service Worker** (`background.js`):
   - Manages blocking rules using Chrome's Declarative Net Request API
   - Listens for toggle messages from the popup
   - Enables/disables blocking based on user preference

2. **Content Script** (`content.js`):
   - Injects scripts into YouTube and Instagram
   - Hides recommendation feeds and notifications

3. **Popup** (`popup.html`, `popup.js`, `popup.css`):
   - Provides user interface for toggling focus mode
   - Manages Pomodoro timer
   - Displays motivational quotes

## Customization

### Add More Blocked Sites

Edit `background.js` and add new rules to the `blockedRules` array:

```javascript
{
  id: 4,
  priority: 1,
  action: { type: "block" },
  condition: {
    urlFilter: "||example.com",
    resourceTypes: ["main_frame"]
  }
}
```

### Change Timer Duration

In `popup.js`, find the timer initialization and change the duration value.

### Modify Quotes

Edit the quotes array in `popup.js` to add your own motivational quotes.

## Browser Compatibility

- **Chrome**: Version 88+
- **Edge**: Version 88+ (Chromium-based)
- **Brave**: Version 1.24+
- **Other Chromium-based browsers**: Check compatibility

## Troubleshooting

### Extension not working?
- Ensure Developer mode is enabled in `chrome://extensions/`
- Reload the extension by toggling the enabled switch
- Check if the blocked sites have changed their domain names

### Timer not persisting?
- The timer is designed to reset when the popup closes. This is intentional to prevent abuse.
- The focus mode setting persists even when the popup is closed

### Websites not being blocked?
- Verify the website URL matches the filter in `background.js`
- Check if the site uses HTTPS (required for blocking)
- Try refreshing the page after enabling Focus Mode

## Future Enhancements

- [ ] Custom blocked websites list
- [ ] Long break timer (15-minute breaks)
- [ ] Statistics and productivity tracking
- [ ] Dark mode
- [ ] Custom timer durations
- [ ] Sound notifications
- [ ] Weekly reports

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## License

Open source - Feel free to use and modify

## Support

Found a bug or have a feature request? Please open an issue on GitHub.

---

**Happy Focusing! 🎯**

Stay productive and maintain your focus with Focus Mode!
