import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import App from './App.jsx';
import { GAMETICKSPEED } from './constents.js';

let clockEvent = new Event('gameClock');

function gameSetup() {
  setInterval(() => {
    //console.log('tick')
    document.dispatchEvent(clockEvent);
  }, GAMETICKSPEED);

  // document.addEventListener('gameClock', () => {
  //   console.log('clock fired!');
  // });
}

gameSetup();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
