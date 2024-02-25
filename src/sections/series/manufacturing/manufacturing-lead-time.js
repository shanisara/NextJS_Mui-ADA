import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

// import { _leadTimeOverall } from 'src/_mock';
import { fPercent } from 'src/utils/format-number';
// ----------------------------------------------------------------------

export default function LeadTime({ title, subheader, ...other }) {
  const [data, setData] = useState({
    avgLeadTime: '13d 15h',
    datasets: [
      { status: '< 1 Day', value: 50 },
      { status: '1 - 7 Days', value: 75 },
      { status: '7 - 30 Days', value: 89.6 },
      { status: '> 30 Days', value: 35 },
    ],
  });

  // const _leadTimeOverall = [...Array(4)].map((_, index) => ({
  //   status: ['< 1 Day', '1 - 7 Days', '7 - 30 Days', '> 30 Days'][index],
  //   value: _mock.number.percent(index),
  // }));

  const getRandomNumber = () => (Math.random() * 10).toFixed(0);
  const getRandomPercent = () => (Math.random() * 100).toFixed(2);

  useEffect(() => {
    const interval = setInterval(() => {
      const _avgLeadTime = `${getRandomNumber()}d ${getRandomNumber()}h`;
      const newData = {
        avgLeadTime: _avgLeadTime,
        datasets: [
          { status: '< 1 Day', value: parseFloat(getRandomPercent()) },
          { status: '1 - 7 Days', value: parseFloat(getRandomPercent()) },
          { status: '7 - 30 Days', value: parseFloat(getRandomPercent()) },
          { status: '> 30 Days', value: parseFloat(getRandomPercent()) },
        ],
      };
      setData(newData);
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <Card {...other}>
      <CardHeader title={title} />

      <Stack sx={{ ml: 3, mr: 3, mt: 1 }} direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Avg. leadtime in production
        </Typography>
        <Typography variant="subtitle1">{data.avgLeadTime}</Typography>
      </Stack>

      <Stack spacing={2} sx={{ p: 2 }}>
        {data.datasets.map((item) => (
          <Stack key={item.status}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Box sx={{ typography: 'caption' }}>{item.status}</Box>

              <Box sx={{ typography: 'body2' }}>{fPercent(item.value)}</Box>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={item.value}
              color={
                (item.status === '< 1 Day' && 'info') ||
                (item.status === '1 - 7 Days' && 'secondary') ||
                (item.status === '7 - 30 Days' && 'warning') ||
                (item.status === '> 30 Days' && 'error') ||
                'primary'
              }
              sx={{
                height: 7,
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16),
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

LeadTime.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};
