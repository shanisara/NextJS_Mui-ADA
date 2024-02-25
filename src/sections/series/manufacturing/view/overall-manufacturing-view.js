'use client';

import React from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { useSettingsContext } from 'src/components/settings';

import LeadTime from '../manufacturing-lead-time';
import WorkInProcess from '../manufacturing-work-in-process';
import QualityControl from '../manufacturing-quality-control';
import DefectAnalytics from '../manufacturing-defect-analytics';
import ProductionYield from '../manufacturing-production-yield';
import OverallEquipmentEffectiveness from '../manufacturing-oee';
import MachineMonitoring from '../manufacturing-machine-monitoring';
import ReceivingShipment from '../manufacturing-receiving-shipment';
import OperatorPerformance from '../manufacturing-operator-performance';
// ----------------------------------------------------------------------

export default function OverallManufacturingView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12} lg={6}>
          <ProductionYield title="Production Yield" chart={{ series: [] }} />
        </Grid>

        <Grid xs={12} md={12} lg={6}>
          <OverallEquipmentEffectiveness title="Overall Equipment Effectiveness" chart={{}} />
        </Grid>

        <Grid xs={12} lg={6}>
          <Stack spacing={3}>
            <MachineMonitoring title="Machine Monitoring" chart={{ series: [] }} />
            <OperatorPerformance title="Operator Performance" chart={{ series: [] }} />
          </Stack>
        </Grid>

        <Grid xs={12} lg={6}>
          <ReceivingShipment
            title="Receiving and Shipment"
            chart={{
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
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={3}>
          <DefectAnalytics title="Defect Analytics" subheader="Total last month" chart={{}} />
        </Grid>

        <Grid xs={12} md={6} lg={3}>
          <WorkInProcess title="Work in process" chart={{ series: [] }} />
        </Grid>

        <Grid xs={12} md={6} lg={3}>
          <QualityControl title="Quality Control" chart={{ series: [] }} />
        </Grid>

        <Grid xs={12} md={6} lg={3}>
          <LeadTime title="Lead Time" />
          {/* <LeadTime title="Lead Time" data={_leadTimeOverall} /> */}
        </Grid>
      </Grid>
    </Container>
  );
}
