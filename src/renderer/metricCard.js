/**
 * metricCard.js
 *
 * Renders an individual metric card with:
 *   - Traffic light indicator (red / amber / green)
 *   - Large percentage value (or "N/A")
 *   - Metric label and description
 *   - Threshold reference pills
 *   - Value at Risk (red/amber) or Value Delivered (green) narrative
 *   - Optional caveat line
 *
 * @param {Object} result     - The calculate() result for this metric
 * @param {string} metricKey  - Key into CONFIG.metrics
 * @param {Object} config     - The CONFIG object
 * @param {string} [labelOverride] - Optional label to show instead of metricConfig.label
 */

const TRAFFIC_COLORS = {
  red:   '#d4574e',
  amber: '#f5a623',
  green: '#67b373',
};

const LIGHT_BG = {
  red:   '#fdf3f2',
  amber: '#fef8ef',
  green: '#f2faf3',
};

function getStatus(percentage, thresholds) {
  if (percentage === null) return 'red';
  if (percentage >= thresholds.green) return 'green';
  if (percentage >= thresholds.red) return 'amber';
  return 'red';
}

function el(tag, styles, text) {
  const node = document.createElement(tag);
  if (styles) Object.assign(node.style, styles);
  if (text !== undefined) node.textContent = text;
  return node;
}

export function renderMetricCard(result, metricKey, config, labelOverride) {
  const metricConfig = config.metrics[metricKey];
  const { thresholds } = metricConfig;
  const status = getStatus(result.percentage, thresholds);
  const color = TRAFFIC_COLORS[status];
  const lightBg = LIGHT_BG[status];
  const label = labelOverride ?? metricConfig.label;

  // ── Card shell ──
  const card = el('div', {
    background: '#ffffff',
    border: '1px solid #e8ebf0',
    borderRadius: '6px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    minWidth: '0',
  });

  // ── Pillar chip + percentage row ──
  const topRow = el('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  });

  const pillar = metricConfig.pillar;
  const pillarChip = el('span', {
    fontSize: '10px',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '10px',
    background: pillar === 'Automation' ? '#f0ebff' : '#e6f4ff',
    color: pillar === 'Automation' ? '#9452ba' : '#0070cc',
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    flexShrink: '0',
  }, pillar);

  const pctDisplay = el('div', {
    fontSize: '32px',
    fontWeight: '700',
    color: color,
    lineHeight: '1',
    letterSpacing: '-1px',
  });
  pctDisplay.textContent = result.percentage !== null ? `${result.percentage}%` : 'N/A';

  topRow.appendChild(pillarChip);
  topRow.appendChild(pctDisplay);
  card.appendChild(topRow);

  // ── Label ──
  card.appendChild(el('div', {
    fontSize: '13px',
    fontWeight: '700',
    color: '#11324d',
    lineHeight: '1.3',
  }, label));

  // ── Threshold reference pills ──
  const pills = el('div', { display: 'flex', gap: '5px', flexWrap: 'wrap' });
  const pillDefs = [
    { text: `< ${thresholds.red}%`,                       status: 'red' },
    { text: `${thresholds.red}–${thresholds.green - 1}%`, status: 'amber' },
    { text: `\u2265 ${thresholds.green}%`,                status: 'green' },
  ];
  for (const pd of pillDefs) {
    const c = TRAFFIC_COLORS[pd.status];
    pills.appendChild(el('span', {
      fontSize: '10px',
      padding: '2px 7px',
      borderRadius: '10px',
      background: `${c}20`,
      color: c,
      fontWeight: '600',
      whiteSpace: 'nowrap',
    }, pd.text));
  }
  card.appendChild(pills);

  // ── Description ──
  card.appendChild(el('div', {
    fontSize: '12px',
    color: '#67768a',
    lineHeight: '1.5',
  }, metricConfig.description));

  // ── Value narrative box ──
  const valueBox = el('div', {
    background: lightBg,
    border: `1px solid ${color}33`,
    borderRadius: '4px',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  });

  const valueHeading = el('div', {
    fontSize: '11px',
    fontWeight: '700',
    color: color,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  });

  const valueBody = el('div', {
    fontSize: '12px',
    color: '#11324d',
    lineHeight: '1.6',
  });

  if (status === 'green') {
    valueHeading.textContent = '\u2713 Value Delivered';
    valueBody.textContent = metricConfig.valueDelivered;
  } else {
    valueHeading.textContent = '\u26a0 Value at Risk';
    valueBody.textContent = metricConfig.valueAtRisk;
  }

  valueBox.appendChild(valueHeading);
  valueBox.appendChild(valueBody);
  card.appendChild(valueBox);

  // ── Caveat ──
  if (result.caveat) {
    card.appendChild(el('div', {
      fontSize: '11px',
      fontStyle: 'italic',
      color: '#67768a',
      lineHeight: '1.4',
    }, `Note: ${result.caveat}`));
  }

  return card;
}
