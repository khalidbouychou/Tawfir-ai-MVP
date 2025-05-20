import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "@material-tailwind/react"
import App from './App.jsx'
import './index.css'

const root = createRoot(document.getElementById('root'))

root.render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
);
