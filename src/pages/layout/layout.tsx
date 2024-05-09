import Navbar from '../../widgets/navbar/index';
import Footer from '../../widgets/footer/index';
import Header from '../../widgets/header/index';

const Layout = ({ children }: any) => {
    return (
        <div className="layout">
            {Navbar()}
            <div className="layout__content">
                {Header()}
                <div className="layout__content__body">{children}</div>
                {Footer()}
            </div>
        </div>
    );
};

export default Layout;
