import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Layout, Shield } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import UploadPdfDialog from './UploadPdfDialog'

function SideBar() {
    return (
        <div className='shadow-2xl h-screen p-7'>
            <Image src={'/logo.svg'} width={50} height={50} alt='logo' />
            <div className='mt-10'>
                <UploadPdfDialog>
                    <Button className="w-full">+ Upload PDF</Button>
                </UploadPdfDialog>
                <div className='flex gap-2 items-center p-5 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer'>
                    <Layout />
                    <h2>Workspace</h2>
                </div>
                <div className='flex gap-2 items-center p-5 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer'>
                    <Shield />
                    <h2>Upgrade</h2>
                </div>
            </div>
            <div className='absolute bottom-24 w-[80%]'>
                <Progress value={33} />
                <p className='text-sm mt-1'>2 out of 5 Pdf Updated</p>
                <p className='text-sm text-gray-400 mt-2'>Upgrade to Upload more PDF</p>
            </div>
        </div>
    )
}

export default SideBar
