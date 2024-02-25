import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fNumber, fPercent } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';
// ----------------------------------------------------------------------

export default function MachineMonitoring({ title, chart, sx, ...other }) {
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
    totalMachines: 25,
    totalRunning: 23,
    totalStop: 3,
    totalMaintaining: 2,
    machinesUtilized: 76.7,
    series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
  });

  const getRandomNumber = () => (Math.random() * 10).toFixed(0);
  const getRandomArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 15));

  useEffect(() => {
    const interval = setInterval(() => {
      const _running = getRandomNumber();
      const _stop = getRandomNumber();
      const _maintaining = getRandomNumber();
      const _total = parseFloat(_running) + parseFloat(_stop) + parseFloat(_maintaining);
      const _machinesUtilized = ((parseFloat(_running) / parseFloat(_total)) * 100).toFixed(2);

      const newData = {
        totalMachines: _total,
        totalRunning: _running,
        totalStop: _stop,
        totalMaintaining: _maintaining,
        machinesUtilized: _machinesUtilized,
        series: getRandomArray,
      };
      setData(newData);
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <Card {...other}>
      <CardHeader title={title} />

      <Box display="grid" sx={{ ml: 3 }}>
        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Grid xs={12} md={2}>
            <Stack>
              <ListItemText
                sx={{ ml: 2 }}
                primary="Machines"
                secondary={fNumber(data.totalMachines)}
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

          <Grid xs={12} md={4}>
            <Stack direction="row" spacing={4} sx={{ mt: 0.5 }}>
              <Stack direction="row" flexGrow={1} sx={{ minWidth: 120 }}>
                <Iconify
                  width={16}
                  icon="eva:checkmark-circle-2-outline"
                  sx={{ mr: 1, color: 'success.main' }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  Running
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ minWidth: 50 }}>
                <Typography variant="body2">{fNumber(data.totalRunning)}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={4} sx={{ mt: 0.5 }}>
              <Stack direction="row" flexGrow={1} sx={{ minWidth: 120 }}>
                <Iconify width={16} icon="eva:slash-outline" sx={{ mr: 1, color: 'error.main' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  Stop
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ minWidth: 50 }}>
                <Typography variant="body2">{fNumber(data.totalStop)}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={4} sx={{ mt: 0.5 }}>
              <Stack direction="row" flexGrow={1} sx={{ minWidth: 120 }}>
                <Iconify
                  width={16}
                  icon="eva:settings-2-outline"
                  sx={{ mr: 1, color: 'warning.main' }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  Maintaining
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="flex-end" sx={{ minWidth: 50 }}>
                <Typography variant="body2">{fNumber(data.totalMaintaining)}</Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={3}>
            <Stack>
              <ListItemText
                sx={{ ml: 3 }}
                primary="Machines Utilized"
                secondary={fPercent(data.machinesUtilized)}
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

          <Grid xs={12} md={3}>
            <Stack>
              <Chart
                dir="ltr"
                type="line"
                series={[{ data: data.series }]}
                options={chartOptions}
                width="80%"
                height={64}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

MachineMonitoring.propTypes = {
  chart: PropTypes.object,
  sx: PropTypes.object,
  title: PropTypes.string,
};
