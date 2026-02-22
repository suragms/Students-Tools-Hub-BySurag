import React from 'react'
import ReactDOM from 'react-dom/client'
import { pdfjs } from 'react-pdf'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js?url'
import App from './App.jsx'
import './index.css'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
