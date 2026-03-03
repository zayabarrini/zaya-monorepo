// SyntaxModal.js - Manages the syntax analysis modal

export class SyntaxModal {
  constructor() {
    this.modal = null;
    this.isVisible = false;
    this.currentText = '';
    this.currentLanguage = '';
    this.onCloseCallback = null;
  }

  createModal() {
    if (this.modal) return;

    this.modal = document.createElement('div');
    this.modal.className = 'syntax-modal';
    this.modal.innerHTML = `
      <div class="syntax-modal-content">
        <div class="syntax-modal-header">
          <h2>Syntax Analysis</h2>
          <button class="syntax-modal-close">&times;</button>
        </div>
        <div class="syntax-modal-body">
          <div class="syntax-loading">Loading analysis...</div>
        </div>
        <div class="syntax-modal-footer">
          <button class="syntax-modal-cancel">Close</button>
        </div>
      </div>
    `;

    // Add event listeners
    const closeBtn = this.modal.querySelector('.syntax-modal-close');
    const cancelBtn = this.modal.querySelector('.syntax-modal-cancel');
    
    closeBtn.addEventListener('click', () => this.hide());
    cancelBtn.addEventListener('click', () => this.hide());
    
    // Close on click outside
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.hide();
      }
    });

    // Escape key handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.hide();
      }
    });

    document.body.appendChild(this.modal);
  }

  show(text, language, content) {
    this.currentText = text;
    this.currentLanguage = language;
    
    this.createModal();
    this.modal.classList.add('visible');
    this.isVisible = true;
    
    const body = this.modal.querySelector('.syntax-modal-body');
    body.innerHTML = content;
  }

  showLoading() {
    if (!this.isVisible) {
      this.createModal();
      this.modal.classList.add('visible');
      this.isVisible = true;
    }
    
    const body = this.modal.querySelector('.syntax-modal-body');
    body.innerHTML = `
      <div class="syntax-loading">
        <div class="syntax-spinner"></div>
        <p>Analyzing ${this.currentLanguage || ''} text...</p>
      </div>
    `;
  }

  showError(message) {
    const body = this.modal.querySelector('.syntax-modal-body');
    body.innerHTML = `
      <div class="syntax-error">
        <div class="error-icon">⚠️</div>
        <p>${message}</p>
      </div>
    `;
  }

  hide() {
    if (this.modal) {
      this.modal.classList.remove('visible');
      this.isVisible = false;
      if (this.onCloseCallback) {
        this.onCloseCallback();
      }
    }
  }

  setOnClose(callback) {
    this.onCloseCallback = callback;
  }

  destroy() {
    if (this.modal && this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
      this.modal = null;
      this.isVisible = false;
    }
  }
}