// Background script - Manages global state across all tabs
let globalState = {
  isExtensionEnabled: false,
  isReadingMode: false,
  rate: 1.0,
  detectedLanguage: 'English',
};

// API configuration
const API_BASE_URL = 'http://127.0.0.1:5000';

// Load initial state
chrome.storage.local.get(
  ['isExtensionEnabled', 'isReadingMode', 'rate', 'detectedLanguage'],
  (result) => {
    globalState = {
      isExtensionEnabled: result.isExtensionEnabled || false,
      isReadingMode: result.isReadingMode || false,
      rate: result.rate || 1.0,
      detectedLanguage: result.detectedLanguage || 'English',
    };
    console.log('✅ Background loaded with state:', globalState);
  }
);

chrome.runtime.onInstalled.addListener(() => {
  console.log('✅ ReadAloud extension installed');
  chrome.storage.local.set({
    isExtensionEnabled: false,
    isReadingMode: false,
    rate: 1.0,
    detectedLanguage: 'English',
  });
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    // Popup requests state
    if (message.action === 'getState') {
      sendResponse(globalState);
      return true;
    }

    // Popup toggles extension
    if (message.action === 'toggleExtension') {
      globalState.isExtensionEnabled = message.enabled;
      // When extension is disabled, also disable reading mode
      if (!globalState.isExtensionEnabled) {
        globalState.isReadingMode = false;
      }

      chrome.storage.local.set({
        isExtensionEnabled: globalState.isExtensionEnabled,
        isReadingMode: globalState.isReadingMode,
      });

      // Broadcast to all tabs
      broadcastToAllTabs({
        action: 'syncState',
        ...globalState,
      });

      sendResponse({ success: true });
      return true;
    }

    // Content script toggles reading mode
    if (message.action === 'toggleReadingMode') {
      globalState.isReadingMode = message.enabled;

      chrome.storage.local.set({
        isReadingMode: globalState.isReadingMode,
      });

      // Broadcast to all tabs
      broadcastToAllTabs({
        action: 'syncState',
        ...globalState,
      });

      sendResponse({ success: true });
      return true;
    }

    // Update rate
    if (message.action === 'updateRate') {
      globalState.rate = message.rate;

      chrome.storage.local.set({
        rate: globalState.rate,
      });

      // Broadcast to all tabs
      broadcastToAllTabs({
        action: 'syncState',
        ...globalState,
      });

      sendResponse({ success: true });
      return true;
    }

    // Update detected language
    if (message.action === 'updateLanguage') {
      globalState.detectedLanguage = message.language;

      chrome.storage.local.set({
        detectedLanguage: globalState.detectedLanguage,
      });

      // No need to broadcast language to all tabs
      sendResponse({ success: true });
      return true;
    }

    // Content script requests initial sync
    if (message.action === 'requestSync') {
      sendResponse(globalState);
      return true;
    }

    // ============= NEW: API PROXY ENDPOINTS =============

    // Proxy for syntax analysis API calls
    if (message.type === 'FETCH_FROM_API') {
      handleApiProxy(message, sendResponse);
      return true; // Will respond asynchronously
    }

    // Get API configuration
    if (message.action === 'getApiConfig') {
      sendResponse({
        baseUrl: API_BASE_URL,
        endpoints: {
          zh: '/api/analyze/chinese',
          ja: '/api/analyze/japanese',
          ko: '/api/analyze/korean',
          ar: '/api/analyze/arabic',
          ru: '/api/analyze/russian',
          hi: '/api/analyze/hindi',
          th: '/api/analyze/thai',
        },
      });
      return true;
    }
  } catch (error) {
    console.error('Error in background script:', error);
    sendResponse({ error: error.message });
  }

  return true;
});

// ============= API PROXY HANDLER =============

// Background script - Update handleApiProxy function

// ============= API PROXY HANDLER =============

async function handleApiProxy(message, sendResponse) {
  const { endpoint, method = 'POST', data, languageCode } = message;

  // Map of language codes to their correct API endpoints
  const endpointMap = {
    // Language code to endpoint mapping
    ja: '/api/analyze/japanese',
    jp: '/api/analyze/japanese',
    zh: '/api/analyze/chinese',
    ko: '/api/analyze/korean',
    kr: '/api/analyze/korean',
    ar: '/api/analyze/arabic',
    ru: '/api/analyze/russian',
    hi: '/api/analyze/hindi',
    in: '/api/analyze/hindi',
    th: '/api/analyze/thai',

    // Direct endpoint paths (if passed directly)
    '/api/analyze/japanese': '/api/analyze/japanese',
    '/api/analyze/chinese': '/api/analyze/chinese',
    '/api/analyze/korean': '/api/analyze/korean',
    '/api/analyze/arabic': '/api/analyze/arabic',
    '/api/analyze/russian': '/api/analyze/russian',
    '/api/analyze/hindi': '/api/analyze/hindi',
    '/api/analyze/thai': '/api/analyze/thai',
  };

  // Determine the correct endpoint
  let actualEndpoint = null;

  // First try using languageCode if provided
  if (languageCode && endpointMap[languageCode]) {
    actualEndpoint = endpointMap[languageCode];
  }
  // Then try using the endpoint string directly
  else if (endpoint && endpointMap[endpoint]) {
    actualEndpoint = endpointMap[endpoint];
  }
  // If endpoint is a full URL, use it as is
  else if (endpoint && endpoint.startsWith('http')) {
    actualEndpoint = endpoint;
  }
  // If endpoint starts with /api, use it directly
  else if (endpoint && endpoint.startsWith('/api')) {
    actualEndpoint = endpoint;
  }
  // Fallback: try to construct from languageCode
  else if (languageCode) {
    actualEndpoint = `/api/analyze/${languageCode}`;
    // Special case for Chinese
    if (languageCode === 'zh') {
      actualEndpoint = '/api/analyze/chinese';
    }
  }

  if (!actualEndpoint) {
    sendResponse({
      success: false,
      error: `No endpoint mapping found for language: ${languageCode || 'unknown'}`,
    });
    return;
  }

  // Construct the full URL
  const url = actualEndpoint.startsWith('http')
    ? actualEndpoint
    : `${API_BASE_URL}${actualEndpoint}`;

  console.log('🔧 [Background] Proxying API request to:', url);
  console.log('🔧 [Background] Request data:', data);

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    console.log('🔧 [Background] Response status:', response.status);

    if (!response.ok) {
      // Try to get error details from response
      let errorDetails = '';
      try {
        const errorData = await response.json();
        errorDetails = errorData.error || JSON.stringify(errorData);
      } catch {
        errorDetails = response.statusText;
      }

      throw new Error(`API error: ${response.status} ${errorDetails}`);
    }

    const responseData = await response.json();
    console.log('🔧 [Background] API response received, success:', responseData.success);

    sendResponse({
      success: true,
      data: responseData,
      languageCode,
    });
  } catch (error) {
    console.error('🔧 [Background] API proxy error:', error);
    sendResponse({
      success: false,
      error: error.message,
      languageCode,
    });
  }
}

// Broadcast message to all tabs
function broadcastToAllTabs(message) {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, message).catch(() => {
        // Ignore errors - tab might not have content script loaded
      });
    });
  });
}

// When a new tab is created or updated, sync state to it
chrome.tabs.onCreated.addListener((tab) => {
  setTimeout(() => {
    chrome.tabs
      .sendMessage(tab.id, {
        action: 'syncState',
        ...globalState,
      })
      .catch(() => {});
  }, 1000); // Wait for content script to load
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    setTimeout(() => {
      chrome.tabs
        .sendMessage(tabId, {
          action: 'syncState',
          ...globalState,
        })
        .catch(() => {});
    }, 500);
  }
});

// Keep service worker alive
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'keepAlive') {
    port.onDisconnect.addListener(() => {
      console.log('Keep-alive port disconnected');
    });
  }
});
