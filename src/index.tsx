import { StrictMode } from 'react'
import { App } from './App';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root') as HTMLElement);

const StrictModeComponent = (
  <StrictMode>
    <App />
  </StrictMode>
);

root.render(StrictModeComponent);
