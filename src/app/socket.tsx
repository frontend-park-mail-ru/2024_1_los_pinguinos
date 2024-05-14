import { useEffect, useState } from '../reactor';

export type Message = {
    data: string;
    sender: string;
    receiver: string;
    time: string;
}

let sharedSocket: WebSocket | null = null;

const withWebSocket = (WrappedComponent: any, url: string) => {
    return function WithWebSocket(props: any) {
        const [socket, setSocket] = useState<WebSocket | null>(null);

        useEffect(() => {
            if (!sharedSocket) {
                sharedSocket = new WebSocket(url);
            }
            setSocket(sharedSocket);

            return () => {
            };
        }, [url]);

        const sendMessage = (message: Message) => {
            if (socket) {
                socket.send(JSON.stringify(message));
            }
        }; 

        useEffect(() => {
            const handleMessage  = (event: MessageEvent) => {
                const message: Message = JSON.parse(event.data);
                console.log(props);
                
                if (props.handleMessage ) {
                    props.onMessage(message);
                }
            };
            console.log(props);
            if (socket) {
                socket.addEventListener('message', handleMessage );
            }

            return () => {
                if (socket) {
                    socket.removeEventListener('message', handleMessage );
                }
            };

        }, [socket]);

        console.log(typeof WrappedComponent);

        if (typeof WrappedComponent === 'function') {
            // Передаем пропсы напрямую
            return WrappedComponent({ ...props, socket, sendMessage });
        } else {
            // Возвращаем JSX с компонентом
            return <WrappedComponent {...props} socket={socket} sendMessage={sendMessage}  />;
        }
    };
};

export default withWebSocket;
