import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-end p-5 shadow-md'>
      <UserButton
        appearance={{
          elements: {
            avatarBox: 'h-16 w-16', // Adjust the size here
          },
        }}
      />
    </div>
  )
}

export default Header
