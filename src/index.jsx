import ReactDOM from 'react-dom/client';
import './index.css';
// redux provider
import { Provider } from 'react-redux';
// global state
import store from './state/index';
// component
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);

