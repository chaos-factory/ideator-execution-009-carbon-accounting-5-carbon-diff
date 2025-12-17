# Carbon Diff

**Explain what changed between two inventories.**

Client-side tool to compare two GHG inventory CSVs and explain deltas with deterministic, audit-grade precision.

🌐 **Live Site:** [https://chaos-factory.github.io/ideator-execution-009-carbon-accounting-5-carbon-diff/](https://chaos-factory.github.io/ideator-execution-009-carbon-accounting-5-carbon-diff/)

## Features

- ✅ **Deterministic row/category/total diffs** - Same inputs = same outputs, every time
- ✅ **Factor/version attribution** - Cites eGRID/EPA Hub versions and explains why deltas occurred
- ✅ **Schema mapping** - Handles mismatched columns and missing fields
- ✅ **Streaming parser** - Fast processing via Web Worker (10k rows in <8s)
- ✅ **Tolerance/groupings** - Flexible comparison options
- ✅ **Export suite** - PDF, CSV, and markdown change-logs with citations
- ✅ **Offline-ready** - Works without internet via Service Worker
- ✅ **Client-only** - No uploads, all processing on your device

## Technology Stack

- **Vanilla HTML/CSS/JavaScript** - No frameworks, no build steps
- **Web Worker** - Background processing for large datasets
- **Service Worker** - Offline caching (optional)
- **GitHub Pages** - Static hosting with CI/CD

## Local Development

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chaos-factory/ideator-execution-009-carbon-accounting-5-carbon-diff.git
   cd ideator-execution-009-carbon-accounting-5-carbon-diff
   ```

2. **Serve locally:**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Python 2
   python -m SimpleHTTPServer 8000
   
   # Or using Node.js (if you have http-server installed)
   npx http-server -p 8000
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

### File Structure

```
.
├── index.html                 # Main landing page
├── css/
│   └── styles.css            # Responsive styles
├── js/
│   ├── main.js               # UI interactions
│   └── worker.js             # Web Worker (stubbed demo)
├── assets/
│   ├── logo.svg              # Carbon Diff wordmark
│   ├── og-hero.png           # Open Graph image
│   ├── icons/                # UI icons (SVG)
│   └── logos/                # Partner logos (placeholder)
├── explanations/
│   └── explanations.signed.json  # Delta explanation library
├── samples/
│   ├── sample_A.csv          # Sample baseline inventory
│   └── sample_B.csv          # Sample current inventory
├── manifest.json             # Web app manifest
├── service-worker.js         # Offline caching (optional)
└── .github/
    └── workflows/
        └── pages.yml         # GitHub Pages deployment
```

## Deployment

The site deploys automatically to GitHub Pages via GitHub Actions:

- **Main branch:** Deploys to production at https://chaos-factory.github.io/ideator-execution-009-carbon-accounting-5-carbon-diff/
- **Pull requests:** Preview deployments (comment with preview info)

### Manual Deployment

To enable GitHub Pages:

1. Go to repository **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"
3. Push to main branch or manually trigger the workflow

## Usage

1. **Try the tool:** Click "Try in your browser" to launch the diff interface
2. **Download samples:** Get sample_A.csv and sample_B.csv to test
3. **Upload your files:** Drop or select your baseline and current CSV files
4. **Review results:** See row-level deltas, category rollups, and factor attribution
5. **Export:** Download PDF report, CSV with deltas, or copy markdown change-log

## Expected CSV Schema

### Required Columns

- `facility` - Facility name or ID
- `scope` - 1, 2, or 3
- `category` - e.g., Electricity, Natural Gas, Transport
- `activity` - Numeric value (e.g., kWh, gallons)
- `factor_id` - Emission factor identifier (e.g., eGRID2024-CAMX-elec)
- `emissions_kgco2e` - Calculated emissions in kgCO₂e

### Optional Columns

- `registry_version` - e.g., v2024.01.20 (enables factor attribution)
- `row_id` - Custom row identifier (if absent, checksum is used)

## Accessibility

- **WCAG AA compliant** - Semantic HTML, keyboard navigable, high-contrast design
- **Screen reader friendly** - Proper ARIA labels and landmarks
- **Keyboard navigation** - All interactive elements accessible via keyboard

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires support for: Web Workers, File API, ES6+

## Contributing

This is a demonstration landing page for the Carbon Diff service. For production use or contributions, please open an issue or pull request.

## License

Provided as-is. Users are responsible for validating outputs for their specific compliance needs.

## Contact

- **GitHub:** [chaos-factory/ideator-execution-009-carbon-accounting-5-carbon-diff](https://github.com/chaos-factory/ideator-execution-009-carbon-accounting-5-carbon-diff)
- **Issues:** [Report a bug or request a feature](https://github.com/chaos-factory/ideator-execution-009-carbon-accounting-5-carbon-diff/issues)

---

**Built with:** Vanilla HTML/CSS/JS • Web Workers • GitHub Pages • Love for determinism ❤️