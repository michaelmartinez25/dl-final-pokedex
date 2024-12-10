import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function HelloWorld() {
  return <h1 className="greeting">Pokedex</h1>;
}

function UploadImage() {
  return (
    <input type="file" accept="image/*" />
  );
}

function TakePhoto() {
  return (
    <button>
      Take a photo
    </button>
  );
}

function MyButton() {
  return (
    <button>
      Who's that Pokemon?
    </button>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelloWorld />
    <UploadImage />
    <TakePhoto />
    <MyButton />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
