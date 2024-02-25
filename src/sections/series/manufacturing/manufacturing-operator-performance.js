import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

import { fNumber, fPercent } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';
// ----------------------------------------------------------------------

const CHART_HEIGHT = 180;

const LEGEND_HEIGHT = 60;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 0px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },

  // my: 5,
  // '& .apexcharts-legend': {
  //   m: 'auto',
  //   height: { sm: 160 },
  //   flexWrap: { sm: 'wrap' },
  //   width: { xs: 240, sm: '50%' },
  // },
  // '& .apexcharts-datalabels-group': {
  //   display: 'none',
  // },
}));

// ----------------------------------------------------------------------

export default function OperatorPerformance({ title, chart, sx, ...other }) {
  const theme = useTheme();

  const { colors, series, options } = chart;

  const seriesData = [
    { label: 'Operator A', value: 1344 },
    { label: 'Operator B', value: 2435 },
    { label: 'Operator C', value: 3443 },
    { label: 'Operator D', value: 2443 },
    { label: 'Operator E', value: 1234 },
    { label: 'Operator F', value: 3214 },
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
    total: 25,
    percent: 23,
    totalOperation: 3,
    totalNoneOperation: 2,
    chartSeries: [22, 8, 35, 50, 82, 84],
  });

  const getRandomNumber = () => (Math.random() * 10).toFixed(0);
  const getRandomArray = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6));

  useEffect(() => {
    const interval = setInterval(() => {
      const _operation = getRandomNumber();
      const _noneOperation = getRandomNumber();
      const _total = parseFloat(_operation) + parseFloat(_noneOperation);
      const _percent = (parseFloat(_noneOperation) / 19) * 100;

      const newData = {
        total: _total,
        percent: _percent > 100 ? 99 : _percent,
        totalOperation: _operation,
        totalNoneOperation: _noneOperation,
        chartSeries: getRandomArray,
      };
      setData(newData);
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <Card {...other}>
      <CardHeader title={title} />

      <Box display="grid" sx={{ ml: 3 }}>
        <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
          <Grid xs={12} md={2}>
            <Stack>
              <ListItemText
                sx={{ ml: 2 }}
                primary="Member"
                secondary={fNumber(data.total)}
                primaryTypographyProps={{
                  component: 'span',
                  sx: { opacity: 0.64 },
                  typography: 'subtitle2',
                }}
                secondaryTypographyProps={{
                  color: 'inherit',
                  typography: 'h4',
                  component: 'span',
                }}
              />
            </Stack>
          </Grid>

          <Grid xs={12} md={5}>
            <Stack direction="row" spacing={4} sx={{ mt: 0.5 }}>
              <Stack direction="row" flexGrow={1} sx={{ minWidth: 200 }}>
                <Iconify
                  width={18}
                  icon="solar:clock-circle-bold"
                  sx={{ mr: 1, color: 'success.main' }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  Total Operation time
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ minWidth: 50 }}>
                <Typography variant="body2">{fNumber(data.totalOperation)}h</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={4} sx={{ mt: 0.5 }}>
              <Stack direction="row" flexGrow={1} sx={{ minWidth: 200 }}>
                <Iconify
                  width={18}
                  icon="solar:clock-circle-bold"
                  sx={{ mr: 1, color: 'error.main' }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  Total Non-operation time
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ minWidth: 50 }}>
                <Typography variant="body2">{fNumber(data.totalNoneOperation)}h</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={4} sx={{ mt: 3, mr: 3 }}>
              <Stack direction="row" spacing={1} sx={{ minWidth: 250, width: 1, height: 1 }}>
                <LinearProgress
                  value={data.percent}
                  variant="determinate"
                  color="primary"
                  sx={{ width: 1, height: 13 }}
                />
                <Typography variant="body2">{fPercent(data.percent)}</Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={5}>
            <StyledChart
              dir="ltr"
              type="pie"
              series={data.chartSeries}
              options={chartOptions}
              width="100%"
              height={110}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

OperatorPerformance.propTypes = {
  chart: PropTypes.object,
  sx: PropTypes.object,
  title: PropTypes.string,
};
