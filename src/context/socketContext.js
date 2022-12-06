import React, { createContext, useContext, useState, useEffect } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

  export const SocketContext = createContext({
    socket: null,
    connect: () => {},
    disconnect: () => {},
    socketState: false,
  })


  const SocketContextProvider = (props) =>{
    const [socket,setSocket] = useState(null)
    const [socketState,setSocketState] = useState(false)
    const [subscription,setSubscription] = useState([])

    useEffect(() => {
      console.log("conectado")
      connect()
    }, []);

    const connect =()=>{
      let socketReconecting = new WebSocket(`ws://67.205.189.142:8000/websockets/`)
      
      if(socketReconecting){
        bindEvents(socketReconecting)
      }
    }

    const disconnect=()=>{
      if(!socket){
        return
      }
      socket.close()
    }

    const bindEvents = (socket)=>{
      socket.onclose = (e) => {
        console.log("Desconectado")
        disconnect()
        setSocketState(false)
        connect()
      };

      socket.onopen = (e) => {
        console.log("Conectado")
        setSocket(socket)
        setSocketState(true)
      };
    }

    return(
      <SocketContext.Provider 
        value={{
          socket,
          connect,
          disconnect,
          socketState
        }}
      >
        {props.children}
      </SocketContext.Provider>
    )
  }

  export function useSocket(){
    const context = useContext(SocketContext)
    return context;
  }

  export default SocketContextProvider;