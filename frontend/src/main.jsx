import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import {Provider} from 'react-redux'
import store from './store.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
     <Provider store={store}>
      <UserContext>
        <CaptainContext>
          <App />
        </CaptainContext>
      </UserContext>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
