import { useState, useEffect } from 'react';

import './App.css';

import HeaderTabs from './components/header-tabs/HeaderTabs';
import Body from './components/body/Body';

function App() {
  const tabs = ['home', 'bills', 'cash'];
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app">
      <HeaderTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
      <Body activeTab={activeTab}/>
    </div>
  );
}

export default App;
