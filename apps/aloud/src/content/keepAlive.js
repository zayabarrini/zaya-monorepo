// Keep-alive mechanism for extension
export function setupKeepAlive() {
  let port = null;
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;

  function connect() {
    try {
      if (!chrome.runtime?.id) {
        console.log('Extension context lost, cannot connect');
        return;
      }

      port = chrome.runtime.connect({ name: 'keepAlive' });

      port.onDisconnect.addListener(() => {
        console.log('Keep-alive port disconnected');
        port = null;

        // Attempt to reconnect if within limits
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          setTimeout(connect, 1000 * reconnectAttempts);
        }
      });

      // Reset reconnect attempts on successful connection
      reconnectAttempts = 0;
    } catch (error) {
      console.log('Failed to connect keep-alive port:', error.message);
    }
  }

  connect();

  // Ping background script periodically
  setInterval(() => {
    try {
      if (chrome.runtime?.id) {
        chrome.runtime.sendMessage({ action: 'ping' }, (response) => {
          if (chrome.runtime.lastError) {
            console.log('Ping failed:', chrome.runtime.lastError.message);
          }
        });
      }
    } catch (error) {
      // Ignore
    }
  }, 10000);
}
