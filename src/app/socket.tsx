import { useEffect, useState } from '../reactor';

export type Message = {
    data: string;
    sender: string;
    receiver: string;
    time: string;
}

let sharedSocket: WebSocket | null = null;

/**
 * 
 * @param { any } WrappedComponent - Компонент, к которому добавляется WebSocket
 * @param { string } url - URL для WebSocket
 * @returns { any } - Возвращает компонент с WebSocket
 */
const withWebSocket = (WrappedComponent: any, url: string) => {

    /**
     * { any } props - Пропсы компонента
     * @returns { any } - Возвращает JSX с компонентом
     */

    return function WithWebSocket(props: any) {
        const [socket, setSocket] = useState<WebSocket | null>(null);

        useEffect(() => {
            if (!sharedSocket) {
                sharedSocket = new WebSocket(url);
                sharedSocket.onclose = () => {
                    console.log('Socket closed, reopening...');
                    sharedSocket = new WebSocket(url);
                    setSocket(sharedSocket);
                }
            }
            setSocket(sharedSocket);

            return () => {
                if(sharedSocket) {
                    sharedSocket.onclose = null;
                }
            };
        }, [url]);


        /**
         * Отправляет сообщение по веб-сокету
         * @param { Message } message - Сообщение для отправки
         * @returns { void } - Ничего не возвращает
         */
        const sendMessage = (message: Message) => {
            if (socket) {
                socket.send(JSON.stringify(message));
            }
        }; 

        /**
         * Закрывает сокет
         * @returns { void } - Ничего не возвращает
         */
        const closeSocket = () => {
            if (socket) {
                socket.close();
                sharedSocket = null;
                setSocket(null);
            }
        }

        useEffect(() => {
            /**
             * Обработчик сообщений
             * @param { MessageEvent } event - Событие сообщения
             * @returns { void } - Ничего не возвращает
             */
            const handleMessage  = (event: MessageEvent) => {
                const message: Message = JSON.parse(event.data);
                
                if (props.handleMessage ) {
                    props.onMessage(message);
                }
            };

            if (socket) {
                socket.addEventListener('message', handleMessage );
            };

            return () => {
                if (socket) {
                    socket.removeEventListener('message', handleMessage );
                }
            };

        }, [socket]);


        if (typeof WrappedComponent === 'function') {
            // Передаем пропсы напрямую
            return WrappedComponent({ ...props, socket, setSocket,  sendMessage, closeSocket });
        } else {
            // Возвращаем JSX с компонентом
            return <WrappedComponent {...props} socket={socket} setSocket={setSocket} sendMessage={sendMessage} closeSocket={closeSocket}  />;
        }
    };
};

export default withWebSocket;
