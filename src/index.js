import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MockTest from './MockTest'
// import reportWebVitals from './reportWebVitals';
import { Provider } from './store'
import './css/mock/m-index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
      {/* <MockTest /> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
