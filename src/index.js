import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ToastProvider } from 'react-toast-notifications';

const app = (
    <BrowserRouter>
        <ToastProvider placement='bottom-right'>
          <App />
        </ToastProvider>
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById("root"))
