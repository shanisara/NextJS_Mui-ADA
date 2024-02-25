import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

import { fNumber } from 'src/utils/format-number';

import Chart, { useChart } from 'src/components/chart';
// ----------------------------------------------------------------------

const CHART_HEIGHT = 200;

const LEGEND_HEIGHT = 62;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

export default function DefectAnalytics({ title, subheader, chart, ...other }) {
  const theme = useTheme();

  const { colors, series, options } = chart;

  const seriesData = [
    { label: 'Team A', value: 4344 },
    { label: 'Team B', value: 5435 },
    { label: 'Team C', value: 1443 },
    { label: 'Team D', value: 4443 },
  ];
  const chartSeries = seriesData.map((i) => i.value);

  const chartOptions = useChart({
    labels: seriesData.map((i) => i.label),
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors,
    stroke: {
      colors: [theme.palette.background.paper],
    },
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    ...options,
  });

  const [data, setData] = useState({
    totalLastMonth: 55,
    totalYesterday: 23,
    totalToday: 120,
    valueToday: 15,
    chartSeries: [22, 8, 35, 50],
  });

  const getRandomNumber = () => (Math.random() * 50).toFixed(0);
  const getRandomArray = Array.from({ length: 4 }, () => Math.floor(Math.random() * 100));

  useEffect(() => {
    const interval = setInterval(() => {
      const _totalLastMonth = getRandomNumber();
      const _totalYesterday = getRandomNumber();
      const _totalToday = getRandomNumber();
      const _valueToday = getRandomNumber();

      const newData = {
        totalLastMonth: _totalLastMonth,
        totalYesterday: _totalYesterday,
        totalToday: _totalToday,
        valueToday: _valueToday,
        chartSeries: getRandomArray,
      };
      setData(newData);
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <Card {...other}>
      <CardHeader title={title} />

      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        sx={{ ml: 3, py: 1, typography: 'subtitle1' }}
      >
        <div>
          <Typography
            variant="caption"
            component="div"
            noWrap
            sx={{ mb: 0.5, color: 'text.secondary', mr: 4 }}
          >
            Total last month (psc)
          </Typography>
          {fNumber(data.totalLastMonth)}
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Yesterday
          </Typography>
          {fNumber(data.totalYesterday)}
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Today
          </Typography>

          <Stack direction="row">
            <Typography variant="subtitle1">{fNumber(data.valueToday)}</Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              /{fNumber(data.totalToday)}
            </Typography>
          </Stack>
        </div>
      </Box>

      <StyledChart
        dir="ltr"
        type="donut"
        series={data.chartSeries}
        options={chartOptions}
        width="100%"
        height={130}
      />

      {/* <Stack sx={{ ml: 3, mr: 3, mt: 1 }} direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Total last month
        </Typography>
        <Stack direction="row">
          <Typography variant="subtitle1">{fNumber(total)}</Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', ml: 1 }}>
            psc.
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ ml: 3, mr: 3, mt: 1 }} direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Yesterday
        </Typography>
        <Stack direction="row">
          <Typography variant="subtitle1">{fNumber(data.yesterdayTotal)}</Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', ml: 1 }}>
            psc.
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ ml: 3, mr: 3 }} direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Today
        </Typography>
        <Stack direction="row">
          <Typography variant="subtitle1">{fNumber(data.todayValue)}</Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', ml: 1 }}>
            /{fNumber(data.todayTotal)}
          </Typography>
        </Stack>
      </Stack> 

      <Stack sx={{ ml: 3, mr: 3, mt: 1 }} direction="row" justifyContent="space-between">
        {data.map((item) => (
          <Stack
            key={item.label}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Typography variant="subtitle2">{item.label}:</Typography>
            <Typography variant="subtitle2">{item.value}</Typography>
            {item.total && <Typography variant="subtitle2">/{item.total}</Typography>}
          </Stack>
        ))}
      </Stack> */}
    </Card>
  );
}

DefectAnalytics.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
