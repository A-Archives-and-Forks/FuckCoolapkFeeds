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
    gap: 1rem;
    margin-bottom: 0;
    align-items: stretch;
  }

  .input {
    flex: 1;
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    background-color: white;
    color: #333;
  }

  .input:focus {
    border-color: #28a745;
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
  }

  .button-group {
    display: flex;
    gap: 0.75rem;
  }

  .button {
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 8px;
    white-space: nowrap;
  }


  .copy-button {
    background-color: #6c757d;
  }

  .copy-button:hover:not(:disabled) {
    background-color: #5a6268;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .redirect-button {
    background-color: #28a745;
  }

  .redirect-button:hover:not(:disabled) {
    background-color: #218838;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
  }

  .button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
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
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  .output-container {
    margin-top: 0.5rem;
    text-align: center;
    word-break: break-all;
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    width: 100%;
    border: 2px solid #e9ecef;
    transition: all 0.3s ease;
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
      background-color: #2d2d2d;
      color: #e0e0e0;
      border-color: #444;
    }

    .input:focus {
      border-color: #28a745;
      box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.2);
    }

    .output-container {
      background-color: #2d2d2d;
      border-color: #444;
    }

    .output-link {
      color: #ced4da;
    }
  }

  @media (max-width: 768px) {
    .title {
      font-size: 3rem;
      margin-bottom: 2rem;
    }

    .input-section {
      flex-direction: column;
      margin-bottom: 0;
    }

    .button-group {
      width: 100%;
      margin-top: 0.5rem;
    }

    .button-group .button {
      flex: 1;
    }

    .input {
      font-size: 1rem;
      padding: 0.9rem 1.2rem;
    }

    .button {
      font-size: 0.95rem;
      padding: 0.9rem 1.5rem;
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