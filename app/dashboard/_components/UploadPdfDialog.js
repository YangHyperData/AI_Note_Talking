"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2Icon } from 'lucide-react'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'

function UploadPdfDialog({ children }) {

    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
    const getFileUrl = useMutation(api.fileStorage.getFileUrl);
    const [file, setFile] = useState();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState();
    const OnFileSelect = (event) => {
        setFile(event.target.files[0]);
    }

    const OnUpload = async () => {
        setLoading(true);
        // Step 1: Get a short-lived upload URL
        const postUrl = await generateUploadUrl();
        // Step 2: POST the file to the URL
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file?.type },
            body: file,
        });
        const { storageId } = await result.json();
        console.log('StorageId', storageId);
        const fileId = uuid4();
        const fileUrl = await getFileUrl({storageId:storageId});
        // Step 3: Save the newly allocated storage id to the database
        const resq = await addFileEntry({
            fileId: fileId,
            storageId: storageId,
            fileName: fileName??'Untitled File',
            fileUrl:fileUrl,
            createBy: user?.primaryEmailAddress?.emailAddress,
        })
        console.log(resq);
        setLoading(false)

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Pdf File</DialogTitle>
                    <DialogDescription asChild>
                        <div className=''>
                            <h2 className='mt-5'>Select a file to Upload</h2>
                            <div className='gap-2 p-3 rounded-md border'>
                                <input type='file' accept='application/pdf' onChange={(event) => OnFileSelect(event)} />
                            </div>
                            <div className='mt-2'>
                                <label>File Name *</label>
                                <Input placeholder="File Name"
                                    onChange={(e) => setFileName(e.target.value)}
                                />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button onClick={OnUpload}>
                        {loading ?
                            <Loader2Icon className='animate-spin' /> : 'Upload'
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UploadPdfDialog
