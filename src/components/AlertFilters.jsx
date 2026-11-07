import React from 'react';

// Controlled inputs: values live in App, and onChange calls update App's state.
export default function AlertFilters({ search, severity, status, sortBy, onSearchChange, onSeverityChange, onStatusChange, onSortChange, onReset }) {
  return (
    <>
      <div className="bar">
        <strong>Find alerts</strong>
        <span>Filter by severity or status, then choose how to sort.</span>
      </div>

      <div className="filters">
        <label>
          Search alerts
          <input
            type="search"
            placeholder="Search title, ID, asset or user"
            value={search}
            onChange={event => onSearchChange(event.target.value)}
          />
        </label>

        <label>
          Severity
          <select value={severity} onChange={event => onSeverityChange(event.target.value)}>
            {['All', 'Critical', 'High', 'Medium', 'Low'].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          Status
          <select value={status} onChange={event => onStatusChange(event.target.value)}>
            {['All', 'New', 'Acknowledged', 'Resolved', 'False Positive'].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          Sort by
          <select value={sortBy} onChange={event => onSortChange(event.target.value)}>
            <option value="priority">Priority first</option>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>

        <button type="button" className="reset" onClick={onReset}>Clear filters</button>
      </div>
    </>
  );
}
