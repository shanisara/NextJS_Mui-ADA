import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { fNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';
// ----------------------------------------------------------------------

export default function ReceivingShipment({ title, subheader, chart, ...other }) {
  const theme = useTheme();

  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '23%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} visits`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  const [data, setData] = useState({
    receivedValue: 86500,
    receivedTotal: 100000,
    deliveryValue: 98887,
    deliveryTotal: 12000,
    chart: [
      {
        labels: [
          '01/01/2003',
          '02/01/2003',
          '03/01/2003',
          '04/01/2003',
          '05/01/2003',
          '06/01/2003',
          '07/01/2003',
          '08/01/2003',
          '09/01/2003',
          '10/01/2003',
          '11/01/2003',
        ],
        series: [
          {
            name: 'Receive',
            type: 'column',
            fill: 'solid',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
          },
          {
            name: 'Shipment',
            type: 'column',
            fill: 'solid',
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
          },
          {
            name: 'Target Receive',
            type: 'area',
            fill: 'gradient',
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
          },
          {
            name: 'Target Shipment',
            type: 'line',
            fill: 'solid',
            data: [25, 33, 27, 31, 51, 42, 33, 48, 29, 36, 51],
          },
        ],
      },
    ],
  });

  const getRandomNumber = () => (Math.random() * 100).toFixed(0);
  const getRandomArray = Array.from({ length: 11 }, () => Math.floor(Math.random() * 100));
  // // console.log(getRandomArray);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const _receivedValue = getRandomNumber();
  //     const _receivedTotal = getRandomNumber();
  //     const _deliveryValue = getRandomNumber();
  //     const _deliveryTotal = getRandomNumber();

  //     const newData = {
  //       receivedValue: _receivedValue,
  //       receivedTotal: _receivedTotal,
  //       deliveryValue: _deliveryValue,
  //       deliveryTotal: _deliveryTotal,

  //       // series: [
  //       //   {
  //       //     name: 'Receive',
  //       //     type: 'column',
  //       //     fill: 'solid',
  //       //     data: [11, 22, 33, 44, 55, 66, 77, 88, 99, 11, 21],
  //       //   },
  //       //   {
  //       //     name: 'Shipment',
  //       //     type: 'column',
  //       //     fill: 'solid',
  //       //     data: [74, 35, 21, 87, 72, 23, 21, 11, 36, 67, 43],
  //       //   },
  //       //   {
  //       //     name: 'Target Receive',
  //       //     type: 'area',
  //       //     fill: 'gradient',
  //       //     data: [30, 45, 56, 20, 96, 85, 64, 32, 59, 56, 29],
  //       //   },
  //       //   {
  //       //     name: 'Target Shipment',
  //       //     type: 'line',
  //       //     fill: 'solid',
  //       //     data: [75, 53, 47, 31, 61, 22, 53, 18, 39, 46, 71],
  //       //   },
  //       // ],
  //       // chart: [
  //       //   {
  //       //     labels: [
  //       //       '01/01/2003',
  //       //       '02/01/2003',
  //       //       '03/01/2003',
  //       //       '04/01/2003',
  //       //       '05/01/2003',
  //       //       '06/01/2003',
  //       //       '07/01/2003',
  //       //       '08/01/2003',
  //       //       '09/01/2003',
  //       //       '10/01/2003',
  //       //       '11/01/2003',
  //       //     ],
  //       //     series: [
  //       //       {
  //       //         name: 'Receive',
  //       //         type: 'column',
  //       //         fill: 'solid',
  //       //         data: getRandomArray(),
  //       //       },
  //       //       {
  //       //         name: 'Shipment',
  //       //         type: 'column',
  //       //         fill: 'solid',
  //       //         data: getRandomArray(),
  //       //       },
  //       //       {
  //       //         name: 'Target Receive',
  //       //         type: 'area',
  //       //         fill: 'gradient',
  //       //         data: getRandomArray(),
  //       //       },
  //       //       {
  //       //         name: 'Target Shipment',
  //       //         type: 'line',
  //       //         fill: 'solid',
  //       //         data: getRandomArray(),
  //       //       },
  //       //     ],
  //       //   },
  //       // ],
  //     };
  //     setData(newData);
  //     // setData((prevData) => ({
  //     //   datasets: [
  //     //     {
  //     //       ...prevData.chart[0],
  //     //       series: [...prevData.chart[0].series, newData],
  //     //     },
  //     //   ],
  //     //   // datasets: newData,
  //     // }));
  //   }, 3000);
  //   return () => clearInterval(interval);
  // });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={280}
        />
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        sx={{ textAlign: 'center', typography: 'body2' }}
      >
        <Stack sx={{ py: 2, borderRight: `dashed 1px ${theme.palette.divider}` }}>
          <Box component="span" sx={{ typography: 'caption', color: 'text.secondary', mb: 1 }}>
            <Iconify width={14} icon="eva:cube-outline" sx={{ mr: 1, color: 'warning.main' }} />
            Total Received (psc.)
          </Box>
          <Stack direction="row" justifyContent="center" alignItems="flex-start">
            <Typography variant="subtitle1">{fNumber(data.receivedValue)}</Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              /{fNumber(data.receivedTotal)}
            </Typography>
          </Stack>
        </Stack>

        <Stack sx={{ py: 2 }}>
          <Box component="span" sx={{ typography: 'caption', color: 'text.secondary', mb: 1 }}>
            <Iconify width={14} icon="eva:car-outline" sx={{ mr: 1, color: 'success.main' }} />
            Total Delivery (psc.)
          </Box>
          <Stack direction="row" justifyContent="center" alignItems="flex-start">
            <Typography variant="subtitle1">{fNumber(data.deliveryValue)}</Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              /{fNumber(data.deliveryTotal)}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}

ReceivingShipment.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
