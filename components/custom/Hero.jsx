"use client"
import Lookup from '@/data/Lookup'
import { MessagesContext } from '@/context/MessagesContext';
import { ArrowRight, Link } from 'lucide-react'
import React, { use, useContext, useState } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext';
import SigninDialog from './SigninDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';

function Hero() {
    const [userInput, setUserInput] = useState('');
    const {message, setMessage} = useContext(MessagesContext);
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const [openDialog, setOpenDialog] = useState(false);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
    const router = useRouter();

    const onGenrate = async(input) => {
        if(!userDetail?.email) {
            setOpenDialog(true);
            return;
        }

        setMessage({
            role: 'user',
            content: input
        })

        const workspaceId = await CreateWorkspace({
            user: userDetail._id,
            message: [{
                role: 'user',
                content: input
            }]
        });
        console.log("Workspace ID: ", workspaceId);
        router.push(`/workspace/`+workspaceId);
    }
    return (
        <div className='flex flex-col items-center mt-36 xl:mt-52 gap-2'>
            <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
            <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>

            <div className='p-5 border rounded-xl max-w-xl w-full mt-5 bg-[#2C2C30]'>
                <div className='flex gap-2'>
                    <textarea 
                        type="text" 
                        placeholder={Lookup.INPUT_PLACEHOLDER} 
                        className='w-full p-2 h-32 max-h-32 bg-transparent outline-none rounded-md'
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    {userInput && <ArrowRight 
                        className='bg-blue-500 p-2 h-10 w-8 rounded-md cursor-pointer'
                        onClick={() => onGenrate(userInput)}
                    />}
                </div>
                <div>
                    <Link className='w-5 h-5'  />
                </div>
            </div>
            <div className='flex flex-wrap max-w-2xl items-center justify-center gap-3 mt-5'>
                {Lookup.SUGGSTIONS.map((item, index) => (
                    <h2 
                        key={index} 
                        className='p-1 px-2 border rounded-full text-sm cursor-pointer text-gray-400 hover:text-white transition'
                        onClick={() => onGenrate(item)}
                    >
                        {item}
                    </h2>
                ))}
            </div>
            <SigninDialog openDialog={openDialog} closeDialog={(v)=>setOpenDialog(v)} />
        </div>
    )
}

export default Hero