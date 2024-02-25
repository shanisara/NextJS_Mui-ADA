import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { fNumber } from 'src/utils/format-number';

import Chart, { useChart } from 'src/components/chart';
// ----------------------------------------------------------------------

export default function QualityControl({ title, chart, ...other }) {
  const { colors, series, options } = chart;

  const seriesData = [
    { label: 'speedometer', value: 30 },
    { label: 'front axle', value: 40 },
    { label: 'rare axle', value: 45 },
    { label: 'other', value: 60 },
  ];
  const chartSeries = seriesData.map((i) => i.value);

  const chartOptions = useChart({
    xaxis: {
      categories: seriesData.map((i) => i.label),
    },
    colors,
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '22%',
        borderRadius: 2,
      },
    },
    ...options,
  });

  const [data, setData] = useState({
    todayValue: 3012,
    todayTotal: 5000,
    monthlyValue: 301,
    monthlyTotal: 250,
    chartSeries: [
      { label: 'speedometer', value: 30 },
      { label: 'front axle', value: 40 },
      { label: 'rare axle', value: 45 },
      { label: 'other', value: 60 },
    ],
  });

  const getRandomNumber = () => (Math.random() * 100).toFixed(0);
  const getRandomArray = Array.from({ length: 4 }, () => Math.floor(Math.random() * 100));

  useEffect(() => {
    const interval = setInterval(() => {
      const _todayValue = getRandomNumber();
      const _todayTotal = getRandomNumber();
      const _monthlyValue = getRandomNumber();
      const _monthlyTotal = getRandomNumber();
      const newData = {
        todayValue: _todayValue,
        todayTotal: _todayTotal,
        monthlyValue: _monthlyValue,
        monthlyTotal: _monthlyTotal,
        chartSeries: getRandomArray,
        // chartSeries: [
        //   { label: 'speedometer', value: parseFloat(getRandomNumber()) },
        //   { label: 'front axle', value: parseFloat(getRandomNumber()) },
        //   { label: 'rare axle', value: parseFloat(getRandomNumber()) },
        //   { label: 'other', value: parseFloat(getRandomNumber()) },
        // ],
      };
      setData(newData);
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <Card {...other}>
      <CardHeader title={title} />

      <Stack sx={{ ml: 3, mr: 3, mt: 1 }} direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Today (psc.)
        </Typography>
        <Stack direction="row">
          <Typography variant="subtitle1">{fNumber(data.todayValue)}</Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            /{fNumber(data.todayTotal)}
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ ml: 3, mr: 3 }} direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Monthly (psc.)
        </Typography>
        <Stack direction="row">
          <Typography variant="subtitle1">{fNumber(data.monthlyValue)}</Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            /{fNumber(data.monthlyTotal)}
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ mx: 3 }}>
        <Chart
          dir="ltr"
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          width="100%"
          height={190}
        />
      </Box>
    </Card>
  );
}

QualityControl.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
};
