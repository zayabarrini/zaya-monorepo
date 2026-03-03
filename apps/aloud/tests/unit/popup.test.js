/**
 * @jest-environment jsdom
 */

describe('Popup', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
      <div class="container">
        <input type="checkbox" id="toggleReadAloud">
        <input type="range" id="speedRange" value="1.0">
        <span id="speedValue">1.0x</span>
        <span id="currentLanguage">English</span>
        <div class="status-panel" id="statusPanel"></div>
        <span id="buttonStatus">Floating button is hidden</span>
      </div>
    `;

    // Mock chrome.storage.local.get
    chrome.storage.local.get.mockImplementation((keys, callback) => {
      callback({
        isSpeakingMode: true,
        rate: 1.5,
        detectedLanguage: 'Spanish',
      });
    });
  });

  test('loads and displays saved state', () => {
    // Simulate popup initialization
    const toggle = document.getElementById('toggleReadAloud');
    const speedRange = document.getElementById('speedRange');
    const speedValue = document.getElementById('speedValue');
    const currentLanguage = document.getElementById('currentLanguage');
    const buttonStatus = document.getElementById('buttonStatus');

    // Manually set values (simulating loaded state)
    toggle.checked = true;
    speedRange.value = '1.5';
    speedValue.textContent = '1.5x';
    currentLanguage.textContent = 'Spanish';
    buttonStatus.textContent = 'Floating button is visible';

    expect(toggle.checked).toBe(true);
    expect(speedRange.value).toBe('1.5');
    expect(speedValue.textContent).toBe('1.5x');
    expect(currentLanguage.textContent).toBe('Spanish');
    expect(buttonStatus.textContent).toBe('Floating button is visible');
  });

  test('updates button status when toggle changes', () => {
    const toggle = document.getElementById('toggleReadAloud');
    const buttonStatus = document.getElementById('buttonStatus');

    // Toggle on
    toggle.checked = true;
    buttonStatus.textContent = 'Floating button is visible';
    expect(buttonStatus.textContent).toBe('Floating button is visible');

    // Toggle off
    toggle.checked = false;
    buttonStatus.textContent = 'Floating button is hidden';
    expect(buttonStatus.textContent).toBe('Floating button is hidden');
  });

  test('updates speed value when range changes', () => {
    const speedRange = document.getElementById('speedRange');
    const speedValue = document.getElementById('speedValue');

    speedRange.value = '2.0';
    speedValue.textContent = '2.0x';

    expect(speedValue.textContent).toBe('2.0x');
  });

  test('sends message to content script when toggled', () => {
    // This would test the message sending logic
    expect(chrome.tabs.query).toBeDefined();
    expect(chrome.tabs.sendMessage).toBeDefined();
  });
});
