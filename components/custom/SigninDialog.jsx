import React, { use, useContext } from 'react'
import { api } from "@/convex/_generated/api";

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
import Lookup from '@/data/Lookup'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import { UserDetailContext } from '@/context/UserDetailContext';
import axios from 'axios';
import { useMutation } from 'convex/react';
import uuid4 from 'uuid4';

function SigninDialog({ openDialog, closeDialog }) {
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const CreateUser = useMutation(api.users.CreateUser);
    const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
        console.log(tokenResponse);
        const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer '+tokenResponse?.access_token } },
        );

        console.log(userInfo);
        const user = userInfo.data;
        await CreateUser({
            name: user?.name,
            email: user?.email,
            picture: user?.picture,
            uid: uuid4(),
        });

        if (typeof window !== undefined) {
            localStorage.setItem('user', JSON.stringify(user));
        }
        setUserDetail(userInfo.data);
        closeDialog(false);
    },
    onError: errorResponse => console.log(errorResponse),
    });
    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription className="flex flex-col items-center justify-center gap-3">
                        <div>
                            <h2 className='font-bold text-2xl text-white text-center'>{Lookup.SIGNIN_HEADING}</h2>
                            <p className='text-gray-400 mt-2 text-center'>{Lookup.SIGNIN_SUBHEADING}</p>
                            <Button 
                                className='mt-5 w-full bg-blue-500 text-white hover:bg-blue-400' 
                                onClick={() => googleLogin()}>Sign In with Google</Button>
                            <p className='text-gray-400 mt-2 text-center'>{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SigninDialog