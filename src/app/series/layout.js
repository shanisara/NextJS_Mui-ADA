'use client';

import PropTypes from 'prop-types';

import { AuthGuard } from 'src/auth/guard';
import SeriesLayout from 'src/layouts/series';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <SeriesLayout>{children}</SeriesLayout>
    </AuthGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
