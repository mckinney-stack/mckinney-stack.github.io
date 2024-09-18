import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LanguageProvider } from './LanguageProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <LanguageProvider>
    <App />
  </LanguageProvider>,
  document.getElementById('root')
);