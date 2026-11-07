import React from 'react';
import { formatUtcTime } from '../utils/alertHelpers';

const sortLabels = { priority: 'Priority first', newest: 'Newest first', oldest: 'Oldest first' };

// Only renders the provided alerts. Selection and filter reset are handled by App.
export default function AlertList({ alerts, selectedId, sortBy, onSelectAlert, onClearFilters }) {
  return (
    <section className="alerts-column" aria-label="Alert list">
      <div className="alert-list">
        <div className="alert-list-heading">
          <strong>Alerts</strong>
          <span>{alerts.length} results · {sortLabels[sortBy] ?? 'Priority first'}</span>
        </div>

        <div className="alert-list-columns" aria-hidden="true">
          <span>Alert ID</span>
          <span>Detection / Asset</span>
          <span>Severity</span>
          <span>Status</span>
          <span>Time (UTC)</span>
        </div>

        {alerts.length > 0 ? (
          <div className="alert-list-results">
            {alerts.map(alert => (
              <button
                type="button"
                key={alert.id}
                className={`alert-row ${alert.id === selectedId ? 'selected' : ''}`}
                aria-pressed={alert.id === selectedId}
                onClick={() => onSelectAlert(alert)}
              >
                <span className="alert-id">{alert.id}</span>

                <span className="alert-detection">
                  <strong className="alert-title">{alert.title}</strong>
                  <small className="alert-meta">{alert.asset} · {alert.status}</small>
                </span>

                <span>
                  <span className={`sev ${alert.severity.toLowerCase()}`}>{alert.severity}</span>
                </span>

                <span className="alert-status">{alert.status}</span>
                <span className="alert-time">{formatUtcTime(alert.timestamp)}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="alert-list-empty">
            <strong>No alerts found</strong>
            <p>Try a different search or remove your filters.</p>
            <button type="button" onClick={onClearFilters}>Clear filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
