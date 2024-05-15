import { useState, useEffect } from 'react';
import './BodyHome.scss';
import { getBills, getCash } from '../../../../utils/storage';
import { renderBills } from '../body-bills/BodyBills';
import { renderCash } from '../body-cash/BodyCash';

const BodyHome = () => {
  const bills = getBills();
  const cash = getCash();

  const getSum = (arr) => {
    let sum = 0;
    arr.forEach(source => sum += parseFloat(source.amount));
    return sum;
  }

  return (
    <div className="app__body-home">
      <div className="app__body-home-bills">
        <h2>Bills</h2>
        <div className="app__body-home-bill-rows">{renderBills(bills)}</div>
        <h3>Total ${getSum(bills)}</h3>
      </div>
      <div className="app__body-home-cash">
        <h2>Cash</h2>
        <div className="app__body-home-cash-rows">{renderCash(cash)}</div>
        <h3>Total ${getSum(cash)}</h3>
      </div>
    </div>
  );
}

export default BodyHome;