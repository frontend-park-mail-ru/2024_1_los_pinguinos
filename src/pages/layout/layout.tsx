import Navbar from '../../widgets/navbar/index';
import Footer from '../../widgets/footer/index';
import Header from '../../widgets/header/index';
import './index.css';

/**
 * Компонент общего макета страниц
 * @param {any} children - дочерние компоненты
 * @return {JSX.Element} Общий макет страниц
 */
const Layout = ({ children }: any) => {
    return (
        <div className="layout">
            <Navbar />
            <div className="layout__content">
                <Header />
                <div className="layout__content__body">{children}</div>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
