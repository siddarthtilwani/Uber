import React, { createContext, useEffect } from 'react'
import io from 'socket.io-client'
export const SocketContext = createContext() 
const socket=io(`${import.meta.env.VITE_BASE_URL}`)
const ScoketProvider=({children})=> {

    useEffect(()=>{
        socket.on('connect',()=>{
            console.log('Connected to server')
        })
        socket.on('disconnect',()=>{
            console.log('Disconnected from server')
        })
        
    },[])

    const sendMessage=(eventName,data)=>{
        socket.emit(eventName,data)
    }

    const recieveMessage=(eventName,callback)=>{
        socket.on(eventName,callback)
    }

  return (
    <SocketContext.Provider value={{sendMessage,recieveMessage}}>
        {children}
    </SocketContext.Provider>
  )
}

export default ScoketProvider
