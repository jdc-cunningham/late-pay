export const getBills = () => {
  const bills = localStorage.getItem('late-pay-bills-js');

  return bills ? JSON.parse(bills) : [];
}

export const getCash = () => {
  const cash = localStorage.getItem('late-pay-cash-js');

  return cash ? JSON.parse(cash) : [];
}
