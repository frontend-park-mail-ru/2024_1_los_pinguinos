import ChatList from '../../widgets/chatList/ui';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <ChatList />
            <div className="layout__content">
                <Header />
                <div className="layout__content__body">{children}</div>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
