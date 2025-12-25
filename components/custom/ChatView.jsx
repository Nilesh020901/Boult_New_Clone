"use client"
import { MessageContext } from '@/context/MessageContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import { useConvex } from 'convex/react';
import { ArrowRight, Link } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  const { message, setMessage } = useContext(MessageContext);
  const [userInput, setUserInput] = useState();


  useEffect(() => {
    id && GetWorkspaceData()
  }, [id]);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id
    });
    setMessage(result?.message)
    console.log("result", result);
  }

  const GetAiResponse = async () => {
    
  }

  return (
    <div className='relative h-[85vh] flex flex-col'>
      <div className='flex-1 overflow-y-scroll'>
        {message?.map((msg, index) => (
          <div
            key={index}
            className='p-3 rounded-lg mb-2 flex gap-2 items-center'
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
          >
            {msg?.role == 'user' && <Image src={userDetail?.picture} alt="user Img" width={35} height={35} className="rounded-full" />}
            <h2>{msg.content}</h2>
          </div>
        ))}
      </div>
      {/* Input Section */}
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
          <Link className='w-5 h-5' />
        </div>
      </div>
    </div>
  )
}

export default ChatView;