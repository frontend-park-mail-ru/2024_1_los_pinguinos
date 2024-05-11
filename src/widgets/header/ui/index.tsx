import { useEffect, useState } from '../../../reactor/index';
import { ButtonLink } from '../../../shared/ui/index';

const Header = () => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    useEffect(() => {
        const trackPath = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', trackPath);
        return () => {
            window.removeEventListener('popstate', trackPath);
        };
    }, []);
    return (
        <div className="header">
            <div className="header__menu">
                <ButtonLink
                    to="/main"
                    label="Карточки"
                    severity={currentPath === '/main' ? 'fill' : 'outline'}
                    onClick={() => setCurrentPath('/main')}
                    fontSize="m"
                />
                <ButtonLink
                    to="/matches"
                    label="Мэтчи"
                    severity={currentPath === '/matches' ? 'fill' : 'outline'}
                    onClick={() => setCurrentPath('/matches')}
                    fontSize="m"
                />
                <ButtonLink
                    to="/profile"
                    label="Настройки"
                    severity={currentPath === '/profile' ? 'fill' : 'outline'}
                    onClick={() => setCurrentPath('/profile')}
                    fontSize="m"
                />
            </div>
        </div>
    );
};

export default Header;
