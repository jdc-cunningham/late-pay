import { useState, useEffect } from 'react';
import './BodyBills.scss';
import CloseIcon from '../../../../assets/icons/close-round-icon.svg';
import { getBills } from '../../../../utils/storage';

const localStorageItemName = 'late-pay-bills-js';

const addBill = (newBill, setBills) => {
  const bills = getBills();
  localStorage.setItem(localStorageItemName, JSON.stringify([...bills, newBill]));
  setBills(getBills());
}

const clearForm = (setFormData, setShowForm) => {
  setFormData({
    name: '',
    amount: '', // want to see placeholder
    daysLate: ''
  });

  setShowForm(false);
}

const addBillsForm = (setShowForm, formData, updateForm, setBills) => (
  <div className="app__body-bills-form">
    <h2>bill info</h2>
    <input type="text" placeholder="name" value={formData.name} onChange={(e) => updateForm('name', e.target.value)}/>
    <input type="number" placeholder="amount" value={formData.amount} onChange={(e) => updateForm('amount', e.target.value)}/>
    <input type="number" placeholder="days late" value={formData.daysLate} onChange={(e) => updateForm('daysLate', e.target.value)}/>
    <button className="app__body-bills-form-save" type="button" title="add bill" onClick={() => addBill(formData, setBills)}>save</button>
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

const removeBill = (billName, setBills) => {
  if (window.confirm("Delete bill " + billName + "?")) {
    const bills = getBills();

    localStorage.setItem(localStorageItemName, JSON.stringify(bills.filter(bill => bill.name !== billName)));
    setBills(getBills());
  }
}

export const renderBills = (bills, editable = true, setBills) => (
  <>
    {!bills.length && <h1>no bills</h1>}
    {/* https://stackoverflow.com/a/42815997/2710227 */}
    {bills.length > 0 && bills.sort((a, b) => b.daysLate - a.daysLate).map((bill, index) => (
      <div key={index} className="app__body-bill">
        <span className="app__body-bill-name">{bill.name}</span>
        <span className="app__body-bill-amount">${bill.amount}</span>
        <span className="app__body-bill-date">{bill.daysLate}</span>
        {editable && <button type="button" className="app__body-bill-remove" title="remove" onClick={() => removeBill(bill.name, setBills)}>
          <img src={CloseIcon} alt="remove bill"/>
        </button>}
      </div>
    ))}
  </>
);

const BodyBills = () => {
  const [bills, setBills] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    amount: '', // placeholders
    daysLate: ''
  });

  const updateForm = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

  useEffect(() => {
    clearForm(setFormData, setShowForm);
  }, [bills]);

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
      {showForm && addBillsForm(setShowForm, formData, updateForm, setBills)}
      <div className="app__body-bills-container">
        {renderBills(bills, true, setBills)}
      </div>
      <div className="app__body-bills-footer">
        <button type="button" onClick={() => setShowForm(true)}>add bill</button>
      </div>
    </div>
  );
}

export default BodyBills;