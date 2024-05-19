import ChatMessages from '../../widgets/chatMessages';
import ChatNavbar from '../../widgets/chatList'

const ChatPage = () => {

    return (
        <div style={{ with: '100%', height: '100%' }}>
            <ChatNavbar />
            <ChatMessages />
        </div>
    );
};

export default ChatPage;
