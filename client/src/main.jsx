import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
