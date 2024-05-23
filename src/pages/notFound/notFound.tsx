import { ButtonLink } from '../../shared/ui/index';
import './index.css';

/**
 * A PageNotFound component that renders a message indicating the page was not found.
 *
 * @function PageNotFound
 * @returns {JSX.Element} The rendered PageNotFound component.
 */
export const PageNotFound = () => {
    return (
        <div className="notfound__wrapper">
            <span className="lost__title">ТАКОЙ СТРАНИЦЫ НЕ СУЩЕСТВУЕТ</span>
            <ButtonLink
                back
                severity="contrast"
                fontSize="l"
                size="m"
                label="Вернуться назад"
            />
        </div>
    );
};
