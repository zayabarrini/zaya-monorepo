read-aloud-extension/
├── src/
│ ├── content/
│ │ ├── index.js # Main content script entry
│ │ ├── ReadAloud.js # Main ReadAloud class
│ │ ├── UIManager.js # Button UI management
│ │ ├── SpeechManager.js # Speech synthesis management
│ │ ├── LanguageDetector.js # Language detection logic
│ │ ├── EventHandler.js # Click/hover event handling
│ │ └── utils.js # Utility functions
│ ├── background/
│ │ └── index.js # Background script
│ ├── popup/
│ │ ├── index.html # Popup HTML
│ │ └── index.js # Popup logic
│ ├── lib/
│ │ └── languagePatterns.js # Language patterns (unchanged)
│ └── icons/ # Icon files
├── tests/ # Test files (unchanged)
├── dist/ # Built extensions
├── manifest.json # Chrome manifest
├── manifest.firefox.json # Firefox manifest
└── package.json
