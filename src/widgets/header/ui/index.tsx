import { Link } from '../../../app/Router';

const Header = () => {
    return(
        <div className="header">
            <div className="header__logo">
                <img src="https://via.placeholder.com/150" alt="logo" />
            </div>
            <div className="header__menu">
                <Link to='/main'>
                    <button className='button button--success button--m'>Главная</button>
                </Link>
                <Link to='/matches'>
                    <button className='button button--success button--m'>Мэтчи</button>
                </Link>
                <img src="https://via.placeholder.com/50" alt="avatar" className='header__pfp' />
                <p className='header__paragraph'></p>
            </div>
        </div>
    )
};

export default Header;