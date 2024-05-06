import ChatMessages from '../../widgets/chatMessages';
import ChatList from '../../widgets/chatList';
import Layout from '../layout/layout';

const ChatPage = () => {
    return (
        <div
        style={{with: '100%', height: '100%'}}
        >
            <ChatList />
            <ChatMessages />
        </div>
    );
};

export default ChatPage;
