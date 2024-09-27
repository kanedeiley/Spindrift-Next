"use client"
import React, {Suspense } from 'react';
import Cards from '../load/Cards';
import { fetchSpotAction } from '@/utils/actions';

function Graph({id}:{id:number}) {
//const data = fetchSpotAction({id})
return (
    <Suspense fallback={<Cards />}>
    <h1> ID: {id} </h1>
  </Suspense>
  );
}

export default Graph;