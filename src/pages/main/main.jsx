// import styles from './index.css';
import CardControllers from '../../widgets/cardControllers';
import CardsList from '../../widgets/cardsList/ui';
import Header from '../../widgets/header/index';

const Mainpage = () => {
    return (
        <div>
            <Header />
            <div className="main">
                <div className="content">
                    <CardsList />
                    <CardControllers />
                </div>
            </div>
        </div>
    );
};

export default Mainpage;
