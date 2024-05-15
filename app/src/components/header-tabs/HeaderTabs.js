import { useState, useEffect } from 'react';
import './HeaderTabs.scss';

const HeaderTabs = (props) => {
  const { tabs, activeTab, setActiveTab } = props;

  return (
    <div className="app__header-tabs">
      {tabs.map((tab, index) =>
        <div
          key={index}
          className={`app__header-tab ${tab === activeTab ? 'active' : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </div>
      )}
    </div>
  );
}

export default HeaderTabs;
