import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';

import { fNumber } from 'src/utils/format-number';

// import {  } from 'src/_mock';

import Chart, { useChart } from 'src/components/chart';
// ----------------------------------------------------------------------

export default function ProductionYield({ title, subheader, chart, ...other }) {
  const theme = useTheme();

  const smUp = useResponsive('up', 'sm');

  const {
    colors = [
      [theme.palette.primary.light, theme.palette.primary.main],
      [theme.palette.success.light, theme.palette.success.main],
    ],
    series,
    options,
  } = chart;

  const chartOptionsProductionRate = useChart({
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: colors[0][0], opacity: 1 },
          { offset: 100, color: colors[0][1], opacity: 1 },
        ],
      },
    },
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      padding: {
        top: -9,
        bottom: -9,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '60%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 5,
            fontSize: theme.typography.body2.fontSize,
          },
        },
      },
    },
    ...options,
  });

  const chartOptionsProductionYield = {
    ...chartOptionsProductionRate,
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: colors[1][0], opacity: 1 },
          { offset: 100, color: colors[1][1], opacity: 1 },
        ],
      },
    },
  };

  const getRandomNumber = () => Math.random() * 100;

  const [data, setData] = useState({
    productionRatePercent: 75,
    productionRateValue: 86500,
    productionRateTotal: 100000,
    productionYieldPercent: 62,
    productionYieldNgValue: 111000,
    productionYieldNgTotal: 135000,
    productionYieldFgValue: 100000,
    productionYieldFgTotal: 180000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const _rateValue = getRandomNumber();
      const _rateTotal = getRandomNumber();
      const _ratePercent = ((_rateValue / _rateTotal) * 100).toFixed(2);
      const _ngValue = getRandomNumber();
      const _ngTotal = getRandomNumber();
      const _fgValue = getRandomNumber();
      const _fgTotal = getRandomNumber();
      const _percent = (((_ngValue + _fgValue) / (_ngTotal + _fgTotal)) * 100).toFixed(2);

      const newData = {
        productionRatePercent: _ratePercent,
        productionRateValue: _rateValue,
        productionRateTotal: _rateTotal,
        productionYieldPercent: _percent,
        productionYieldNgValue: _ngValue,
        productionYieldNgTotal: _ngTotal,
        productionYieldFgValue: _fgValue,
        productionYieldFgTotal: _fgTotal,
      };
      setData(newData);
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <Card {...other}>
      <CardHeader title={title} />

      <Stack
        sx={{ mb: 2 }}
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        divider={
          <Divider
            orientation={smUp ? 'vertical' : 'horizontal'}
            flexItem
            sx={{ borderStyle: 'dashed' }}
          />
        }
      >
        <Stack
          spacing={3}
          direction="row"
          alignItems="center"
          justifyContent={{ sm: 'center' }}
          sx={{
            py: 1,
            width: 1,
            px: { xs: 3, sm: 0 },
          }}
        >
          <Chart
            dir="ltr"
            type="radialBar"
            series={[data.productionRatePercent]}
            options={chartOptionsProductionRate}
            width={120}
            height={125}
          />
          <Stack direction="column">
            <Typography variant="body2" sx={{ opacity: 0.72, mb: 2 }}>
              Production rate (pcs.)
            </Typography>
            <Stack direction="row">
              <Typography variant="subtitle1">{fNumber(data.productionRateValue)}</Typography>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                /{fNumber(data.productionRateTotal)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          spacing={3}
          direction="row"
          alignItems="center"
          justifyContent={{ sm: 'center' }}
          sx={{
            py: 1,
            width: 1,
            px: { xs: 3, sm: 0 },
          }}
        >
          <Chart
            dir="ltr"
            type="radialBar"
            series={[data.productionYieldPercent]}
            options={chartOptionsProductionYield}
            width={120}
            height={125}
          />

          <Stack direction="column">
            <Typography variant="body2" sx={{ opacity: 0.72, mb: 2 }}>
              Production rate (pcs.)
            </Typography>
            <Stack direction="row">
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', mr: 2 }}>
                NG
              </Typography>
              <Typography variant="subtitle1">{fNumber(data.productionYieldNgValue)}</Typography>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                /{fNumber(data.productionYieldNgTotal)}
              </Typography>
            </Stack>

            <Stack direction="row">
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', mr: 2 }}>
                FG
              </Typography>
              <Typography variant="subtitle1">{fNumber(data.productionYieldFgValue)}</Typography>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                /{fNumber(data.productionYieldFgTotal)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* {series.map((item, index) => (
          <Stack
            key={item.id}
            spacing={3}
            direction="row"
            alignItems="center"
            justifyContent={{ sm: 'center' }}
            sx={{
              py: 1,
              width: 1,
              px: { xs: 3, sm: 0 },
            }}
          >
            <Chart
              dir="ltr"
              type="radialBar"
              series={[item.percent]}
              options={index === 1 ? chartOptionsCheckout : chartOptionsCheckIn}
              width={120}
              height={125}
            />

            <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
              <Typography variant="body2" sx={{ opacity: 0.72, mb: 2 }}>
                {item.label}
              </Typography>

              {item.id === 1 && (
                <Stack direction="row" justifyContent="center" alignItems="flex-start">
                  <Typography variant="subtitle1">{fNumber(item.value)}</Typography>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    /{fNumber(item.total)}
                  </Typography>
                </Stack>
              )}

              {item.id === 2 && (
                <Stack direction="column" justifyContent="center" alignItems="flex-start">
                  <Stack direction="row" justifyContent="center" alignItems="flex-start">
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', mr: 2 }}>
                      NG
                    </Typography>
                    <Typography variant="subtitle1">{fNumber(item.data[0].value)}</Typography>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      /{fNumber(item.data[0].total)}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="center" alignItems="flex-start">
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', mr: 2 }}>
                      FG
                    </Typography>
                    <Typography variant="subtitle1">{fNumber(item.data[1].value)}</Typography>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      /{fNumber(item.data[1].total)}
                    </Typography>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Stack>
        ))} */}
      </Stack>
    </Card>
  );
}

ProductionYield.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
  // data: PropTypes.object,
};
