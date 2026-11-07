# Alert Management Console

A React-based interface for reviewing, prioritising and updating fictional security alerts. This project improves the supplied CyberSift starter application with a clearer triage workflow, faster investigation and more focused status management.

## Getting started

**Requirements:** Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal. To check the production build:

```bash
npm run build
```

The application uses the 36 fictional alerts supplied in `src/alerts.js`. It does not require a backend or API keys.

## Three main UX problems addressed

**1. Investigation required too much scrolling.** The original wide table separated the alert list from its details. I introduced a two-column workspace so an analyst can select an alert and review its context alongside the list. On smaller screens, the layout stacks vertically.

**2. Urgent work was difficult to identify.** The previous presentation did not make the most actionable alerts obvious. I added summary counts, severity indicators and a default **Priority first** order: unresolved alerts first, then severity, investigation status and most recent event. Analysts can also sort by newest or oldest.

**3. Finding and updating alerts needed clearer feedback.** I simplified search and filtering, added an empty-results state with a way to clear filters, and made status updates an explicit action in the investigation panel. The Save button is disabled when nothing has changed, and successful updates show a confirmation message.

## Design and technical decisions

- **Single source of truth:** `App.jsx` holds alert data, filters, selection and pending status changes. It passes data and callbacks to child components through props.
- **Focused components:** `ConsoleHeader`, `AlertSummary`, `AlertFilters`, `AlertList` and `AlertDetails` each cover one part of the interface. Shared sorting and UTC date-formatting functions live in `src/utils/alertHelpers.js`.
- **Derived data:** Search, filtering and sorting are calculated with `useMemo`. Status updates create a new alerts array rather than modifying existing state directly.
- **Visual direction:** A restrained interface with compact rows, clear labels, subtle borders and limited use of red for emphasis. The goal was to support a security analyst's workflow rather than add decorative elements.

## Trade-offs and next steps

I prioritised the core triage, find, investigate and act workflows within the exercise's time limit. All data and status changes are held in memory, so changes reset on refresh. There is no authentication, backend, audit history or persistence.

With more time, I would connect the interface to an API, persist status changes with an audit trail, add automated component tests, and improve the behaviour when a selected alert no longer matches the active filters.

## Time spent

Approximately 4 hours, including reviewing the original application, implementing the improvements, refactoring the React components, and testing the functionality.

## AI assistance

ChatGPT assisted with React/CSS implementation, component refactoring and troubleshooting. I tested the application locally.
