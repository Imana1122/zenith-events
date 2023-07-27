import React from 'react'

const UserLayoutComponent = ({title, children}) => {
  return (
    <div className='flex flex-col justify-start items-start max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 py-12'>
        <h2 className='font-bold text-xl text-purple-800 leading-tight font-serif ml-4'>{title}</h2>
        <div >
        {children}
        </div>
    </div>
  )
}

export default UserLayoutComponent
