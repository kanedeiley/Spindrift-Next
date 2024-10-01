"use client"
import React, {Suspense } from 'react';
import Cards from '../load/Cards';

function Graph({id}:{id:number}) {
return (
    <Suspense fallback={<Cards />}>
    <h1> ID: {id} </h1>
  </Suspense>
  );
}

export default Graph;