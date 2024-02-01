import React, { useEffect, useState } from 'react';
import loader from '../../assets/loading.gif';


function Loader() {
  return (
    <div className='loader' data-testid='loader' >
      <img width={150} height={150} src={loader} alt="loading..." />
    </div>
  );
}

export default Loader;
