import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { StoreWarehouse } from './StoreWarehouse'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreWarehouse />
  </StrictMode>,
)
