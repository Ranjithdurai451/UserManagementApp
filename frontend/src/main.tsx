import ReactDOM from 'react-dom/client';
import './index.css';
import StateProvider from './wrapppers/stateProvider.tsx';
import App from './App.tsx';
import QueryProvider from './wrapppers/QueryProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StateProvider>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StateProvider>
);
