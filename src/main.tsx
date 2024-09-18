import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppBody from './components/AppHeader/AppBody';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppBody>
        <App />
      </AppBody>
    </Provider>
  </StrictMode>
);

export type AppDispatch = typeof store.dispatch;
