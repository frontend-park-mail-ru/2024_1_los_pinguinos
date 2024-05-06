import { Link } from '../../../shared/routing/link';
import { useState } from '../../../reactor';
// import { Link } from '../../../app/Router';

const Header = () => {

    const current = window.location.pathname.split('/')[1];
    const [selected, setSelected] = useState(current);

    return (
        <div className="header">
            <div className="header__menu">
                <Link to="/main">
                    <button
                        className={
                            selected === 'main'
                                ? 'header__menu__item__active'
                                : 'header__menu__item'
                        }
                        onClick={() => setSelected('main')}
                    >
                        Карточки
                    </button>
                </Link>
                <Link to="/matches">
                    <button
                        className={
                            selected === 'matches'
                                ? 'header__menu__item__active'
                                : 'header__menu__item'
                        }
                        onClick={() => setSelected('matches')}
                    >
                        Мэтчи
                    </button>
                </Link>
                <Link to="/profile">
                    <button
                        className={
                            selected === 'profile'
                                ? 'header__menu__item__active'
                                : 'header__menu__item'
                        }
                        onClick={() => setSelected('profile')}
                    >
                        Настройки
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Header;
