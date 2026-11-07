// Sorting rules are kept outside the UI components so they are easy to test.
// 'Closed' alerts need less immediate attention than New/Acknowledged ones.
const severityRank = { Critical: 0, High: 1, Medium: 2, Low: 3 };
const statusRank = { New: 0, Acknowledged: 1, Resolved: 2, 'False Positive': 3 };

export function isClosed(alert) {
  return alert.status === 'Resolved' || alert.status === 'False Positive';
}

// Priority first: open work, then severity, then status, then newest event.
export function comparePriority(a, b) {
  const aClosed = isClosed(a);
  const bClosed = isClosed(b);
  if (aClosed !== bClosed) return Number(aClosed) - Number(bClosed);

  const severityDifference = (severityRank[a.severity] ?? 4) - (severityRank[b.severity] ?? 4);
  if (severityDifference !== 0) return severityDifference;

  const statusDifference = (statusRank[a.status] ?? 4) - (statusRank[b.status] ?? 4);
  if (statusDifference !== 0) return statusDifference;

  return Date.parse(b.timestamp) - Date.parse(a.timestamp);
}

export function sortAlerts(alerts, sortBy) {
  // Copy to avoid mutating React state or the starter mock array.
  const copy = [...alerts];
  if (sortBy === 'newest') return copy.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
  if (sortBy === 'oldest') return copy.sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
  return copy.sort(comparePriority);
}

// All timestamps are shown in UTC, as indicated in the interface.
export function formatUtcTime(timestamp, includeYear = false) {
  return new Date(timestamp).toLocaleString('en-GB', {
    timeZone: 'UTC',
    day: '2-digit',
    month: 'short',
    ...(includeYear ? { year: 'numeric' } : {}),
    hour: '2-digit',
    minute: '2-digit'
  });
}
