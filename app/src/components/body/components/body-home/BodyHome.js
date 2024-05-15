import { useState, useEffect } from 'react';
import './BodyHome.scss';
import { getBills, getCash } from '../../../../utils/storage';
import { renderBills } from '../body-bills/BodyBills';
import { renderCash } from '../body-cash/BodyCash';

const BodyHome = () => {
  const bills = getBills();
  const cash = getCash();

  return (
    <div className="app__body-home">
      <div className="app__body-home-bills">
        {renderBills(bills)}
      </div>
      <div className="app__body-home-cash">
        {renderCash(cash)}
      </div>
    </div>
  );
}

export default BodyHome;