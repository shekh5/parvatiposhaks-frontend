
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { StrictMode } from 'react'

import {Provider} from "react-redux"
import { store } from './app/store.js'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

createRoot(document.getElementById('root')).render(
 <StrictMode>
   <Provider store={store}>
   <App />
    <ToastContainer />
   </Provider>
 </StrictMode>
)
