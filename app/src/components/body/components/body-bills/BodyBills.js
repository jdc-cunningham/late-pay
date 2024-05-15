import { useState, useEffect } from 'react';
import './BodyBills.scss';

import CloseIcon from '../../../../assets/icons/close-round-icon.svg';

const localStorageItemName = 'late-pay-bills-js';

const getBills = () => {
  const bills = localStorage.getItem(localStorageItemName);

  return bills ? JSON.parse(bills) : [];
}

const setBills = (newBill, setShowForm, setFormData) => {
  const bills = getBills();
  localStorage.setItem(localStorageItemName, JSON.stringify([...bills, newBill]));

  setFormData({
    name: '',
    amount: 0,
    date: ''
  });

  setShowForm(false);
}

const addBillsForm = (setShowForm, formData, updateForm, setFormData) => (
  <div className="app__body-bills-form">
    <h2>bill info</h2>
    <input type="text" placeholder="name" value={formData.name} onChange={(e) => updateForm('name', e.target.value)}/>
    <input type="number" placeholder="amount" value={formData.amount} onChange={(e) => updateForm('amount', e.target.value)}/>
    <input type="date" placeholder="mm/dd/yyyy" value={formData.date} onChange={(e) => updateForm('date', e.target.value)}/>
    <button className="app__body-bills-form-save" type="button" title="add bill" onClick={() => setBills(formData, setShowForm, setFormData)}>save</button>
    <button className="app__body-bills-form-close" type="button" title="cancel" onClick={() => setShowForm(false)}>
      <img alt="close form" src={CloseIcon}/>
    </button>
  </div>
);

const formatDate = (date) => {
  const dateParts = date.split('-');
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${months[parseInt(dateParts[1])]} ${dateParts[2]}`;
}

const BodyBills = () => {
  const [bills, setBills] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    amount: 0,
    date: ''
  });

  const updateForm = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (!showForm) {
      setBills(getBills());
    }
  }, [showForm])

  useEffect(() => {
    setBills(getBills());
  }, []);

  return (
    <div className="app__body-bills">
      {showForm && addBillsForm(setShowForm, formData, updateForm, setFormData)}
      <div className="app__body-bills-container">
        {!bills.length && <h1>no bills</h1>}
        {bills.length > 0 && bills.map((bill, index) => (
          <div key={index} className="app__body-bill">
            <span className="app__body-bill-name">{bill.name}</span>
            <span className="app__body-bill-amount">${bill.amount}</span>
            <span className="app__body-bill-date">{formatDate(bill.date)}</span>
          </div>
        ))}
      </div>
      <div className="app__body-bills-footer">
        <button type="button" onClick={() => setShowForm(true)}>add bill</button>
      </div>
    </div>
  );
}

export default BodyBills;