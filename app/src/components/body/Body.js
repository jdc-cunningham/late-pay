import { useState, useEffect } from 'react';
import './Body.scss';

import BodyBills from './components/body-bills/BodyBills';
import BodyCash from './components/body-cash/BodyCash';

const Body = (props) => {
  const { activeTab } = props;

  const body = activeTab === 'cash'
    ? <BodyCash/>
    : <BodyBills/>;

  return (
    <div className="app__body">
      {body}
    </div>
  );
}

export default Body;
