import React, { useMemo, useState } from 'react';
import { initialAlerts } from './alerts';
import ConsoleHeader from './components/ConsoleHeader';
import AlertSummary from './components/AlertSummary';
import AlertFilters from './components/AlertFilters';
import AlertList from './components/AlertList';
import AlertDetails from './components/AlertDetails';
import { comparePriority, sortAlerts } from './utils/alertHelpers';

// App is the single source of truth: changes here flow down to child components.
const initialSelectedAlert = [...initialAlerts].sort(comparePriority)[0] ?? null;

export default function App() {
  // Local/mock data: refreshing the page resets all status changes.
  const [alerts, setAlerts] = useState(initialAlerts);
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('All');
  const [status, setStatus] = useState('All');
  const [sortBy, setSortBy] = useState('priority');

  const [selectedId, setSelectedId] = useState(initialSelectedAlert?.id ?? null);
  const [pendingAction, setPendingAction] = useState(initialSelectedAlert?.status ?? 'New');
  const [notice, setNotice] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  const selected = alerts.find(alert => alert.id === selectedId);

  // Derived list: recompute only when alerts/search/filters/sorting change.
  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    const matching = alerts.filter(alert => {
      const matchesSeverity = severity === 'All' || alert.severity === severity;
      const matchesStatus = status === 'All' || alert.status === status;
      const matchesSearch = !term || [
        alert.id, alert.title, alert.asset, alert.user, alert.description
      ].some(value => String(value ?? '').toLowerCase().includes(term));
      return matchesSeverity && matchesStatus && matchesSearch;
    });
    return sortAlerts(matching, sortBy);
  }, [alerts, search, severity, status, sortBy]);

  function selectAlert(alert) {
    setSelectedId(alert.id);
    setPendingAction(alert.status); // Prevent a prior alert's unsaved status carrying over.
    setNotice('');
    setShowNotes(false);
  }

  function applyAction() {
    if (!selected || pendingAction === selected.status) return;
    const previousStatus = selected.status;

    // Update only the matching alert; the summary/list/details all react to this.
    setAlerts(current => current.map(alert =>
      alert.id === selectedId ? { ...alert, status: pendingAction } : alert
    ));
    setNotice(`${selectedId} changed from ${previousStatus} to ${pendingAction}.`);
  }

  function resetFilters() {
    setSearch('');
    setSeverity('All');
    setStatus('All');
    setSortBy('priority');
  }

  function changePendingAction(value) {
    setPendingAction(value);
    setNotice('');
  }

  return (
    <div className="page">
      <ConsoleHeader />

      <main className="content">
        <div className="headline">
          <h1>Security alerts</h1>
          <span>Environment: Demo &nbsp; | &nbsp; Local alert data</span>
        </div>
        <p className="intro">Review detections, investigate context and update alert status.</p>

        <AlertSummary alerts={alerts} />

        <AlertFilters
          search={search}
          severity={severity}
          status={status}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onSeverityChange={setSeverity}
          onStatusChange={setStatus}
          onSortChange={setSortBy}
          onReset={resetFilters}
        />

        <div className="workspace">
          <AlertList
            alerts={filtered}
            selectedId={selectedId}
            sortBy={sortBy}
            onSelectAlert={selectAlert}
            onClearFilters={resetFilters}
          />
          <AlertDetails
            selected={selected}
            pendingAction={pendingAction}
            onPendingActionChange={changePendingAction}
            onApplyAction={applyAction}
            notice={notice}
            showNotes={showNotes}
            onToggleNotes={() => setShowNotes(current => !current)}
          />
        </div>

        <footer>
          CyberSift · Part of GO plc. Group · Demo environment · All alerts and identities are fictional
        </footer>
      </main>
    </div>
  );
}
