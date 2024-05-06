// import styles from './index.css';
import CardControllers from '../../widgets/cardControllers';
import CardsList from '../../widgets/cardsList/ui';

const Mainpage = () => {
    return (
        <div className="main">
            <div className="content">
                {CardsList()}
                {CardControllers()}
            </div>
        </div>
    );
};

export default Mainpage;
