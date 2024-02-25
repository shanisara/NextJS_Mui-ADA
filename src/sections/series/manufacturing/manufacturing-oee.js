import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

import { useResponsive } from 'src/hooks/use-responsive';

import Chart, { useChart } from 'src/components/chart';
// ----------------------------------------------------------------------

export default function OverallEquipmentEffectiveness({ title, subheader, chart, ...other }) {
  const theme = useTheme();

  const smUp = useResponsive('up', 'sm');

  const {
    colors = [
      [theme.palette.primary.main, theme.palette.primary.dark],
      [theme.palette.warning.main, theme.palette.warning.dark],
      [theme.palette.info.main, theme.palette.info.dark],
      [theme.palette.success.main, theme.palette.success.dark],
    ],
    series,
    options,
  } = chart;

  // const chartOptions = useChart({
  //   chart: {
  //     offsetY: -16,
  //     sparkline: {
  //       enabled: true,
  //     },
  //   },
  //   grid: {
  //     padding: {
  //       top: 15,
  //       bottom: 15,
  //     },
  //   },
  //   legend: {
  //     show: false,
  //   },
  //   plotOptions: {
  //     radialBar: {
  //       startAngle: -90,
  //       endAngle: 90,
  //       hollow: {
  //         size: '56%',
  //       },
  //       dataLabels: {
  //         name: {
  //           offsetY: 8,
  //         },
  //         value: {
  //           offsetY: -27,
  //         },
  //         total: {
  //           label: 'OEE',
  //           color: theme.palette.text.disabled,
  //           fontSize: theme.typography.subtitle2.fontSize,
  //           fontWeight: theme.typography.subtitle2.fontWeight,
  //         },
  //       },
  //     },
  //   },
  //   fill: {
  //     type: 'gradient',
  //     gradient: {
  //       colorStops: [
  //         { offset: 0, color: colors[0][0], opacity: 1 },
  //         { offset: 100, color: colors[0][1], opacity: 1 },
  //       ],
  //     },
  //   },
  //   ...options,
  // });

  const chartOptions1 = useChart({
    // labels: ['OEE'],
    chart: {
      offsetY: -16,
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      padding: {
        top: 15,
        bottom: 15,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '56%',
        },
        dataLabels: {
          name: {
            offsetY: 8,
          },
          value: {
            offsetY: -27,
            fontSize: 22,
          },
          total: {
            label: 'OEE',
            color: theme.palette.text.disabled,
            fontSize: theme.typography.subtitle2.fontSize,
            fontWeight: theme.typography.subtitle2.fontWeight,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: colors[0][0], opacity: 1 },
          { offset: 100, color: colors[0][1], opacity: 1 },
        ],
      },
    },
    ...options,
  });

  const chartOptions2 = useChart({
    chart: {
      offsetY: -16,
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      padding: {
        top: 15,
        bottom: 15,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '56%',
        },
        dataLabels: {
          name: {
            offsetY: 8,
          },
          value: {
            offsetY: -27,
          },
          total: {
            label: 'Availability',
            color: theme.palette.text.disabled,
            fontSize: theme.typography.subtitle2.fontSize,
            fontWeight: theme.typography.subtitle2.fontWeight,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: colors[1][0], opacity: 1 },
          { offset: 100, color: colors[1][1], opacity: 1 },
        ],
      },
    },
    ...options,
  });

  const chartOptions3 = useChart({
    chart: {
      offsetY: -16,
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      padding: {
        top: 15,
        bottom: 15,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '56%',
        },
        dataLabels: {
          name: {
            offsetY: 8,
          },
          value: {
            offsetY: -27,
          },
          total: {
            label: 'Performace',
            color: theme.palette.text.disabled,
            fontSize: theme.typography.subtitle2.fontSize,
            fontWeight: theme.typography.subtitle2.fontWeight,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: colors[2][0], opacity: 1 },
          { offset: 100, color: colors[2][1], opacity: 1 },
        ],
      },
    },
    ...options,
  });

  const chartOptions4 = useChart({
    chart: {
      offsetY: -16,
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      padding: {
        top: 15,
        bottom: 15,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '56%',
        },
        dataLabels: {
          name: {
            offsetY: 8,
          },
          value: {
            offsetY: -27,
          },
          total: {
            label: 'Quality',
            color: theme.palette.text.disabled,
            fontSize: theme.typography.subtitle2.fontSize,
            fontWeight: theme.typography.subtitle2.fontWeight,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: colors[3][0], opacity: 1 },
          { offset: 100, color: colors[3][1], opacity: 1 },
        ],
      },
    },
    ...options,
  });

  const getChartOptions = (index) => {
    if (index === 0) {
      return chartOptions1;
    }
    if (index === 1) {
      return chartOptions2;
    }
    if (index === 2) {
      return chartOptions3;
    }
    return chartOptions4;
  };

  const getRandomPercent = () => (Math.random() * 100).toFixed(2);

  const [data, setData] = useState({
    datasets: [
      { label: 'OEE', percent: 50 },
      { label: 'Availability', percent: 75 },
      { label: 'Performance', percent: 89.6 },
      { label: 'Queality', percent: 35 },
    ],
    // labels: ['OEE', 'Availability', 'Performace', 'Quality'],
    // oeePercent: 15,
    // availabilityPercent: 49.93,
    // performancePercent: 74.37,
    // quealityPercent: 78.92,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [
        { label: 'OEE', percent: getRandomPercent() },
        { label: 'Availability', percent: getRandomPercent() },
        { label: 'Performance', percent: getRandomPercent() },
        { label: 'Queality', percent: getRandomPercent() },
      ];
      setData((prevData) => ({
        datasets: newData,
      }));
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <Card {...other}>
      <CardHeader title={title} />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={
          <Divider
            orientation={smUp ? 'vertical' : 'horizontal'}
            flexItem
            sx={{ borderStyle: 'dashed' }}
          />
        }
      >
        {[...Array(4)].map((item, index) => (
          <Stack
            key={index}
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
              series={[data.datasets[index].percent]}
              options={getChartOptions(index)}
              width={180}
              height={220}
            />
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

OverallEquipmentEffectiveness.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
