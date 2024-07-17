import React from 'react'
import { MySidebar } from './components'
import { Outlet } from 'react-router-dom'

const App = () => {

  return (
    <div className='flex bg-gray-200 p-2 gap-3'>
        <MySidebar/>
        <div className='w-full'>
          <Outlet />
        </div>
    </div>
  )
}

export default App

