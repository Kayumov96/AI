import React from 'react'
import Card from './components/card';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function App() {

  return (
    <div className='App'>
        <ToastContainer/>
       <Card/>   
    </div>
  )
}
