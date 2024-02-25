import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { fNumber, fPercent } from 'src/utils/format-number';

import Chart, { useChart } from 'src/components/chart';
// ----------------------------------------------------------------------

export default function WorkInProcess({ title, subheader, chart, sx, ...other }) {
  const theme = useTheme();

  const {
    colors = [theme.palette.primary.light, theme.palette.primary.main],
    series,
    options,
  } = chart;

  const chartOptions = useChart({
    colors: [colors[1]],
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: colors[0], opacity: 1 },
          { offset: 100, color: colors[1], opacity: 1 },
        ],
      },
    },
    chart: {
      animations: {
        enabled: true,
      },
      sparkline: {
        enabled: true,
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
      marker: {
        show: false,
      },
    },
    ...options,
  });

  const [data, setData] = useState({
    wip: 30982,
    budget: 50000,
    percent: 55,
    series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
  });

  const getRandomNumber = () => (Math.random() * 10).toFixed(0);
  const getRandomArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 20));

  useEffect(() => {
    const interval = setInterval(() => {
      const _wip = getRandomNumber();
      const _budget = getRandomNumber();
      const _percent = (parseFloat(_wip) / parseFloat(_budget)) * 100;

      const newData = {
        wip: _wip,
        budget: _budget,
        percent: _percent > 100 ? 99 : _percent,
        series: getRandomArray,
      };
      setData(newData);
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <Card {...other}>
      <CardHeader title={title} />

      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        sx={{ ml: 2, mr: 3, mt: 2, px: 1, width: 1, height: 1 }}
      >
        <LinearProgress
          value={data.percent}
          variant="determinate"
          color="primary"
          // color={
          //   (percent < 25 && 'error') ||
          //   (percent > 25 && percent < 50 && 'info') ||
          //   (percent > 50 && percent < 75 && 'warning') ||
          //   'success'
          // }
          sx={{ width: 1, height: 15, mr: 3 }}
        />
        <Typography variant="subtitle1" sx={{ width: 80 }}>
          {fPercent(data.percent)}
        </Typography>
      </Stack>

      <Box display="grid" sx={{ p: 3 }}>
        <Typography variant="body2" sx={{ opacity: 0.64 }}>
          WIP (psc)
        </Typography>

        <Stack direction="row">
          <Typography variant="h6" sx={{}}>
            {fNumber(data.wip)}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            /{fNumber(data.budget)}
          </Typography>
        </Stack>
      </Box>

      <Stack alignItems="center" sx={{ mb: 2 }}>
        <Chart
          dir="ltr"
          type="line"
          series={[{ data: data.series }]}
          options={chartOptions}
          width="100%"
          height={108}
        />
      </Stack>
    </Card>
  );
}

WorkInProcess.propTypes = {
  chart: PropTypes.object,
  sx: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};
