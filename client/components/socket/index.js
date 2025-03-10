import {io} from 'socket.io-client'

export const socketInit=()=>{
    const options={
        'force new connection':true,
        reconnectionAttempts:'Infinity',
        timeout:10000,
        transports:['websocket'],
    };
    return io('https://karaoke-backend.onrender.com',options);
};