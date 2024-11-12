import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader() {
    return (
        <div className='p-4 flex justify-between shadow-md'>
            <Image src={'/logo.svg'} alt='logo' width={200} height={200} />
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

export default WorkspaceHeader
