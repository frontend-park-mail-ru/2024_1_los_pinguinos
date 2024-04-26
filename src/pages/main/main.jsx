// import styles from './index.css';
import CardControllers from '../../widgets/cardControllers';
import CardsList from '../../widgets/cardsList/ui';

const Mainpage = () => {
    return (
        <div className='main'>
            <CardsList />
            <CardControllers />
        </div>
    );
};

export default Mainpage;
