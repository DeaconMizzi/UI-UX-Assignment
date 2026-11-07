import React from 'react';
import { isClosed } from '../utils/alertHelpers';

// Derived counts: no extra state, so updates automatically appear after a save.
export default function AlertSummary({ alerts }) {
  const unresolved = alerts.filter(alert => !isClosed(alert)).length;
  const critical = alerts.filter(alert => alert.severity === 'Critical').length;
  const newlyDetected = alerts.filter(alert => alert.status === 'New').length;
  const resolved = alerts.filter(alert => alert.status === 'Resolved').length;

  return (
    <div className="statline">
      <div><b>{unresolved}</b><small>Unresolved</small></div>
      <div><b>{critical}</b><small>Critical</small></div>
      <div><b>{newlyDetected}</b><small>New</small></div>
      <div><b>{resolved}</b><small>Resolved</small></div>
    </div>
  );
}
