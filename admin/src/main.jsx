import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Landing from './Landing.jsx'
import { Provider } from 'react-redux'
import store from './context/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Landing />
    </Provider>
  </React.StrictMode>,
)
