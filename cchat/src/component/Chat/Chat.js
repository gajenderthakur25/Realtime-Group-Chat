import React, { useState } from 'react'
import { useEffect } from 'react';
import {user} from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import Message from "../Message/Message";
import closeIcon from '../../images/close.png';
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT="http://localhost:4500";//specifies the server endpoint (URL) to which you want to connect.

const Chat = () => {


    const [id,setid]=useState("");
    const [messages,setMessages]=useState([]);// object that stores user and message.

    const send=()=>{
        const message=document.getElementById('chatInput').value;
        socket.emit('message',{message,id})
        document.getElementById('chatInput').value="";
    }

     useEffect(() => {
        socket=socketIo(ENDPOINT,{transports:['websocket']});

         socket.on('connect',()=>{
             alert('connected');
             setid(socket.id);
         })

         socket.emit('joined',{user})

         socket.on('welcome',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message);
         })

         socket.on('userJoined',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message);
         })

         socket.on('leave',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message);
         })
       return () => {
        socket.emit('disconnect')
        socket.off();
       }
     }, [user])

     useEffect(() => {
       socket.on('sendMessage',(data)=>{
        setMessages([...messages,data]);
        console.log(data.user,data.message,data.id);
       })
     
       return () => {
         socket.off();
       }
     }, [messages])
     
    

  return (
   // item is an object having user and message
    <div className='chatPage'>
       <div className='chatContainer'>
        <div className='header'>
         <h2>Group Chat App</h2>
         <a href='http://localhost:3000/'><img src={closeIcon} alt='close'/></a>
        </div>
        <ReactScrollToBottom  className='chatBox'>
      {messages.map((item,i)=><Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}/>)}
        </ReactScrollToBottom> 
        <div className='inputBox'>
            <input onKeyPress={(event)=>event.key==='Enter'?send():null} type='text' autocomplete="off" id='chatInput'></input>
            <button onClick={send} className='sendBtn'>Send</button>
        </div>
       </div>
    </div>

  )
}

export default Chat