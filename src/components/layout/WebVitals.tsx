'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // You can send metrics to your analytics service here
    console.debug(metric);
  });

  return null;
}
