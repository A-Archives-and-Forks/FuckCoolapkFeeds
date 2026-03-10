export const styles = `
  .container {
    min-height: 100vh;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .main {
    padding: 2rem 0 3rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 800px;
    padding-top: max(2rem, 10vh);
  }

  .title {
    margin: 0 0 1rem;
    line-height: 1.15;
    font-size: 4rem;
    text-align: center;
    font-weight: bold;
    color: #28a745;
  }

  .github-container {
    margin-bottom: 2.5rem;
    text-align: center;
  }

  .input-section {
    width: 100%;
    display: flex;
    margin-bottom: 0;
    position: relative;
    align-items: center;
  }

  .input {
    flex: 1;
    padding: 1.1rem 8rem 1.1rem 1.5rem;
    font-size: 1.05rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 14px;
    outline: none;
    transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;
    background-color: transparent;
    color: #1e293b;
    width: 100%;
  }

  .input:focus {
    background-color: transparent;
    border-color: #28a745;
    box-shadow: 0 0 0 1px rgba(40, 167, 69, 0.1);
  }

  .input::placeholder {
    color: #94a3b8;
  }

  .button-group {
    position: absolute;
    right: 0.75rem;
    display: flex;
    gap: 0.25rem;
    align-items: center;
    height: 60%;
    padding-left: 0.75rem;
    border-left: 1px solid rgba(0, 0, 0, 0.06);
  }

  .button {
    padding: 0 0.8rem;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 6px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2.8rem;
    height: 100%;
    background-color: transparent;
  }

  .copy-button {
    color: #6c757d;
  }

  .copy-button:hover:not(:disabled) {
    background-color: rgba(108, 117, 125, 0.1);
    color: #495057;
  }

  .redirect-button {
    color: #28a745;
  }

  .redirect-button:hover:not(:disabled) {
    background-color: rgba(40, 167, 69, 0.1);
    color: #218838;
  }

  .button:disabled {
    color: #ccc;
    cursor: not-allowed;
    opacity: 0.5;
  }

  .arrow-down {
    font-size: 2.5rem;
    color: #28a745;
    margin: 1rem 0 0.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .arrow-down.visible {
    opacity: 1;
  }

  .output-container {
    margin-top: 0.5rem;
    text-align: center;
    word-break: break-all;
    background-color: transparent;
    padding: 1.5rem;
    border-radius: 14px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s ease;
    box-sizing: border-box;
    overflow-wrap: break-word;
    opacity: 0;
    min-height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .output-container.visible {
    opacity: 1;
  }

  .output-link {
    font-family: ui-monospace, 'SF Mono', 'Cascadia Code', 'Segoe UI Mono', Menlo, Monaco, 'Courier New', monospace;
    color: #495057;
    font-size: 1.05rem;
    font-weight: 400;
    display: block;
    padding: 0;
    margin: 0;
    background: none;
    word-break: break-all;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    text-align: center;
    width: 100%;
    letter-spacing: -0.01em;
  }

  @media (prefers-color-scheme: dark) {
    .input {
      background-color: transparent;
      color: #e2e8f0;
      border-color: rgba(255, 255, 255, 0.15);
      box-shadow: none;
    }

    .input:focus {
      background-color: transparent;
      border-color: #3dd56d;
      box-shadow: 0 0 0 1px rgba(61, 213, 109, 0.2);
    }

    .input::placeholder {
      color: #64748b;
    }

    .button-group {
      border-left-color: rgba(255, 255, 255, 0.1);
    }

    .output-container {
      background-color: transparent;
      border-color: rgba(255, 255, 255, 0.15);
    }

    .output-link {
      color: #ced4da;
    }

    .copy-button {
      color: #adb5bd;
    }

    .copy-button:hover:not(:disabled) {
      background-color: rgba(173, 181, 189, 0.15);
      color: #f8f9fa;
    }

    .redirect-button {
      color: #3dd56d;
    }

    .redirect-button:hover:not(:disabled) {
      background-color: rgba(61, 213, 109, 0.15);
      color: #8df0a1;
    }
  }

  @media (max-width: 768px) {
    .title {
      font-size: 3rem;
      margin-bottom: 2rem;
    }

    .input-section {
      flex-direction: row;
      margin-bottom: 0;
    }

    .button-group {
      width: auto;
      margin-top: 0;
      right: 0.4rem;
    }

    .input {
      font-size: 1rem;
      padding: 0.9rem 7rem 0.9rem 1.2rem;
    }

    .button {
      font-size: 0.95rem;
      padding: 0 0.6rem;
      min-width: 2.6rem;
    }

    .output-container {
      padding: 1rem;
    }

    .output-link {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .title {
      font-size: 2.5rem;
    }

    .arrow-down {
      font-size: 2rem;
    }
  }

  .footer {
    padding: 2rem 0 1.5rem;
    text-align: center;
  }

  .powered-by {
    margin: 0;
    font-size: 0.9rem;
    color: #6c757d;
  }

  .powered-by.deployed {
    margin-top: 0.25rem;
  }

  .tech {
    font-weight: 600;
    color: #28a745;
  }

  @media (prefers-color-scheme: dark) {
    .powered-by {
      color: #adb5bd;
    }

    .tech {
      color: #3dd56d;
    }
  }

  .github-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #6c757d;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s ease, background-color 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 6px;
  }

  .github-link:visited {
    color: #6c757d;
  }

  .github-link:hover {
    color: #28a745;
    background-color: rgba(40, 167, 69, 0.1);
    text-decoration: none;
  }

  .github-link svg {
    transition: transform 0.3s ease;
  }

  .github-link:hover svg {
    transform: scale(1.1);
  }

  @media (prefers-color-scheme: dark) {
    .github-link {
      color: #adb5bd;
    }

    .github-link:visited {
      color: #adb5bd;
    }

    .github-link:hover {
      color: #3dd56d;
      background-color: rgba(61, 213, 109, 0.1);
      text-decoration: none;
    }
  }

  /* Headlines section embedded in home page */
  .hl-section {
    width: 100%;
    margin-top: 2rem;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e9ecef;
  }

  .hl-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-bottom: 1px solid #e9ecef;
    background: #fff;
  }

  .hl-section-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 700;
    color: #28a745;
    letter-spacing: 0.3px;
  }

  .hl-end-msg {
    text-align: center;
    padding: 24px 0;
    color: #999;
    font-size: 13px;
    background: #fff;
  }

  .hl-iframe-container {
    position: relative;
    width: 100%;
    transition: min-height 0.3s ease;
  }

  .hl-loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #999;
    font-size: 13px;
    z-index: 1;
    pointer-events: none;
  }

  .hl-spinner {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #e9ecef;
    border-top-color: #28a745;
    animation: spin 0.8s linear infinite;
  }

  .hl-iframe {
    width: 100%;
    border: none;
    display: block;
    overflow: hidden;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (prefers-color-scheme: dark) {
    .hl-section {
      border-color: #2a2a2a;
    }

    .hl-section-header {
      background: #1e1e1e;
      border-bottom-color: #2a2a2a;
    }

    .hl-end-msg {
      background: #1a1a1a;
      color: #777;
    }

    .hl-loading {
      color: #666;
    }

    .hl-spinner {
      border-color: #333;
      border-top-color: #3dd56d;
    }
  }
`;