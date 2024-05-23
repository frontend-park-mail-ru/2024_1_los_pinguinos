import ChatMessages from '../../widgets/chatMessages/index';
import ChatNavbar from '../../widgets/chatList/index';
import './index.css';


/**
 * Компонент страницы чатов
 * @return {JSX.Element} ChatPage component
 */
const ChatPage = () => {

    return (
        <div style={{ with: '100%', height: '100%' }}>
            <ChatNavbar />
            <ChatMessages />
        </div>
    );
};

export default ChatPage;
