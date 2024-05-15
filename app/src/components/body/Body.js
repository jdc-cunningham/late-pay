import { useState, useEffect } from 'react';
import './Body.scss';

import BodyHome from './components/body-home/BodyHome';
import BodyBills from './components/body-bills/BodyBills';
import BodyCash from './components/body-cash/BodyCash';

const Body = (props) => {
  const { activeTab } = props;

  const body = (activeTab) => {
    if (activeTab === 'home') return <BodyHome/>;
    if (activeTab === 'cash') return <BodyCash/>;
    if (activeTab === 'bills') return <BodyBills/>;
  }

  return (
    <div className="app__body">
      {body(activeTab)}
    </div>
  );
}

export default Body;
