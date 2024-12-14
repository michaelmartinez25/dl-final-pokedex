import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import logo from './logo.svg';
import './App.css';

function Test() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/model/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <p>The current time is {currentTime}.</p>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
// const theme = createTheme({
//   components: {
//     MuiTypography: {
//       defaultProps: {
//         variantMapping: {
//           h1: 'h2',
//           h2: 'h2',
//           h3: 'h2',
//           h4: 'h2',
//           h5: 'h2',
//           h6: 'h2',
//           subtitle1: 'h2',
//           subtitle2: 'h2',
//           body1: 'span',
//           body2: 'span',
//         },
//       },
//     },
//   },
// });

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
