"use client"
import React, {Suspense } from 'react';
import Cards from '../load/Cards';
import BarChartComponent from '../charts/BarChart';

function Graph({id}:{id:number}) {
return (
    <Suspense fallback={<Cards />}>
    <BarChartComponent />
  </Suspense>
  );
}

export default Graph;