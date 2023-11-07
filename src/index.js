import React from 'react';
import ReactDOM from 'react-dom';
import { LiffProvider } from 'react-liff';

import './index.css';
import App from './App';


const liffId ='2001245899-jrgM28vo'
const appStyle = {
  marginLeft :"20px",
  display: 'inline-block'
}
ReactDOM.render(
  <React.StrictMode>
    
      <LiffProvider liffId={liffId}>
      <div style={appStyle}>
        <App />
      </div>
      </LiffProvider>
   
  </React.StrictMode>,
  document.getElementById('root')
);


