import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./App.css"

const root = document.querySelector('#root') as HTMLDivElement;

createRoot(root).render(
  <>
    <App />
  </>
)
