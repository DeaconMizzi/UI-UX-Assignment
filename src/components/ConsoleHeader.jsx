import React from 'react';

// Presentation-only header; no fake navigation links.
export default function ConsoleHeader() {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brandbox" aria-hidden="true">CS</span>
        <span>CyberSift</span>
      </div>
      <span className="topbar-context">Security operations · Demo</span>
    </header>
  );
}
