import React from 'react'
import { RouterProvider } from 'react-router-dom'
// import  Button  from './components/ui/Button'
import Router from '../src/routes/Router'
const App : React.FC =  () => {
  return (

    <>
      <RouterProvider router={Router}/>
    </>
  )
}

export default App
