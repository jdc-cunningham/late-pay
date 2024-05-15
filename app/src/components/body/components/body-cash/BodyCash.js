import { useState, useEffect } from 'react';
import './BodyCash.scss';
import CloseIcon from '../../../../assets/icons/close-round-icon.svg';
import { getCash } from '../../../../utils/storage';

const localStorageItemName = 'late-pay-cash-js';

const setCash = (newBill, setShowForm, setFormData) => {
  const cash = getCash();
  localStorage.setItem(localStorageItemName, JSON.stringify([...cash, newBill]));

  setFormData({
    name: '',
    amount: 0,
    date: ''
  });

  setShowForm(false);
}

const addCashForm = (setShowForm, formData, updateForm, setFormData) => (
  <div className="app__body-cash-form">
    <h2>cash info</h2>
    <input type="text" placeholder="name" value={formData.name} onChange={(e) => updateForm('name', e.target.value)}/>
    <input type="number" placeholder="amount" value={formData.amount} onChange={(e) => updateForm('amount', e.target.value)}/>
    <input type="date" placeholder="mm/dd/yyyy" value={formData.date} onChange={(e) => updateForm('date', e.target.value)}/>
    <button className="app__body-cash-form-save" type="button" title="add cash" onClick={() => setCash(formData, setShowForm, setFormData)}>save</button>
    <button className="app__body-cash-form-close" type="button" title="cancel" onClick={() => setShowForm(false)}>
      <img alt="close form" src={CloseIcon}/>
    </button>
  </div>
);

const formatDate = (date) => {
  const dateParts = date.split('-');
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${months[parseInt(dateParts[1])]} ${dateParts[2]}`;
}

const removeBill = (cashName, setCash) => {
  if (window.confirm("Delete cash " + cashName + "?")) {
    const cash = getCash();

    localStorage.setItem(localStorageItemName, JSON.stringify(cash.filter(cash => cash.name !== cashName)));
    setCash(getCash());
  }
}

export const renderCash = (cash) => (
  <>
    {!cash.length && <h1>no cash</h1>}
    {cash.length > 0 && cash.map((cash, index) => (
      <div key={index} className="app__body-cash-row">
        <span className="app__body-cash-name">{cash.name}</span>
        <span className="app__body-cash-amount">${cash.amount}</span>
        <span className="app__body-cash-date">{formatDate(cash.date)}</span>
        <button type="button" className="app__body-cash-remove" title="remove" onClick={() => removeBill(cash.name, setCash)}>
          <img src={CloseIcon} alt="remove cash"/>
        </button>
      </div>
    ))}
  </>
);

const BodyCash = () => {
  const [cash, setCash] = useState([]);
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
      setCash(getCash());
    }
  }, [showForm])

  useEffect(() => {
    setCash(getCash());
  }, []);

  return (
    <div className="app__body-cash">
      {showForm && addCashForm(setShowForm, formData, updateForm, setFormData)}
      <div className="app__body-cash-container">
        {renderCash(cash)}
      </div>
      <div className="app__body-cash-footer">
        <button type="button" onClick={() => setShowForm(true)}>add cash</button>
      </div>
    </div>
  );
}

export default BodyCash;