import React from 'react';
import { formatUtcTime } from '../utils/alertHelpers';

const statuses = ['New', 'Acknowledged', 'Resolved', 'False Positive'];

// Receives the selected alert and callbacks; App owns the actual alert data.
export default function AlertDetails({ selected, pendingAction, onPendingActionChange, onApplyAction, notice, showNotes, onToggleNotes }) {
  return (
    <aside className="detail-column" aria-label="Alert investigation">
      {selected ? (
        <section className="inspector" aria-labelledby="selected-alert-title">
          <div className="inspector-header">
            <div className="inspector-header-top">
              <span className="inspector-label">Selected alert</span>
              <span className="inspector-id">{selected.id}</span>
            </div>

            <h2 id="selected-alert-title">{selected.title}</h2>
            <div className="inspector-badges">
              <span className={`inspector-severity ${selected.severity.toLowerCase()}`}>
                {selected.severity}
              </span>
              <span className="inspector-status">{selected.status}</span>
            </div>
          </div>

          <div className="inspector-section">
            <h3>Description</h3>
            <p>{selected.description}</p>
          </div>

          <div className="inspector-section">
            <div className="inspector-info-grid">
              <div className="inspector-field"><span>Asset</span><strong>{selected.asset}</strong></div>
              <div className="inspector-field"><span>Associated user</span><strong>{selected.user}</strong></div>
              <div className="inspector-field"><span>Category</span><strong>{selected.category}</strong></div>
              <div className="inspector-field"><span>Detection source</span><strong>{selected.source}</strong></div>
              <div className="inspector-field"><span>Source IP</span><strong>{selected.srcIp}</strong></div>
              <div className="inspector-field">
                <span>Event time (UTC)</span>
                <strong>{formatUtcTime(selected.timestamp, true)}</strong>
              </div>
            </div>
          </div>

          <div className="inspector-section">
            <button
              type="button"
              className="inspector-notes-toggle"
              aria-expanded={showNotes}
              aria-controls="supporting-notes"
              onClick={onToggleNotes}
            >
              {showNotes ? '− Hide supporting notes' : '+ Show supporting notes'}
            </button>
            {showNotes && (
              <p id="supporting-notes" className="inspector-notes">{selected.notes}</p>
            )}
          </div>

          <div className="inspector-actions">
            <label htmlFor="alert-status">Change investigation status</label>
            <div className="inspector-action-row">
              <select
                id="alert-status"
                value={pendingAction}
                onChange={event => onPendingActionChange(event.target.value)}
              >
                {statuses.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
              <button
                type="button"
                className="inspector-save"
                onClick={onApplyAction}
                disabled={pendingAction === selected.status}
              >
                Save status
              </button>
            </div>
            {notice && <p className="inspector-notice" role="status">{notice}</p>}
          </div>
        </section>
      ) : (
        <div className="inspector-empty">Select an alert to view its details.</div>
      )}
    </aside>
  );
}
