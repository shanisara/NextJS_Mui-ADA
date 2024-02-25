import { _mock } from './_mock';

// PRODUCTION YIELD
// ----------------------------------------------------------------------
export const _productionYieldOverall = [
  {
    id: 1,
    label: 'Production rate (pcs.)',
    percent: 75,
    total: 150000,
    value: 150000,
  },
  {
    id: 2,
    label: 'Production yield (pcs.)',
    percent: 53.8,
    data: [
      { type: 'NG', total: 111000, value: 135555 },
      { type: 'FG', total: 180000, value: 100000 },
    ],
  },
];

// OVERALL EQUIPMENT EFFECTIVENESS (OEE)
// ----------------------------------------------------------------------

// MACHINE MONITORING
// ----------------------------------------------------------------------

// OPERATOR PERFORMANCE
// ----------------------------------------------------------------------

// RECEIVING AND SHIPMENT
// ----------------------------------------------------------------------

// DEFECT ANALYTICS
// ----------------------------------------------------------------------

// WORK IN PROCESS (WIP)
// ----------------------------------------------------------------------

// QUALITY CONTROL (QC)
// ----------------------------------------------------------------------

// LEAD TIME
// ----------------------------------------------------------------------
export const _leadTimeOverall = [...Array(4)].map((_, index) => ({
  status: ['< 1 Day', '1 - 7 Days', '7 - 30 Days', '> 30 Days'][index],
  value: _mock.number.percent(index),
}));

export const _leadTimeOverall2 = ['< 1 Day', '1 - 7 Days', '7 - 30 Days', '> 30 Days'].map(
  (label, index) => ({
    label,
    value: _mock.number.percent(index),
  })
);
