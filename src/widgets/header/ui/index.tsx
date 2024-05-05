import { Link } from '../../../shared/routing/link';
import { useState } from '../../../reactor';
// import { Link } from '../../../app/Router';

const Header = () => {
    const [selected, setSelected] = useState('cards');

    return (
        <div className="header">
            <div className="header__menu">
                <Link to="/main">
                    <button
                        className={
                            selected === 'cards'
                                ? 'header__menu__item__active'
                                : 'header__menu__item'
                        }
                        onClick={() => setSelected('cards')}
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
                            selected === 'settings'
                                ? 'header__menu__item__active'
                                : 'header__menu__item'
                        }
                        onClick={() => setSelected('settings')}
                    >
                        Настройки
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Header;
