import { ButtonLink } from '../../shared/ui/index';

/**
 * A PageOffline component that renders a message indicating the need for a network connection.
 *
 * @function PageOffline
 * @returns {JSX.Element} The rendered PageOffline component.
 */
export const PageOffline = () => {
    return (
        <div className="notfound__wrapper">
            <span className="lost__title">НЕОБХОДИМО ПОДКЛЮЧЕНИЕ К СЕТИ</span>
            <ButtonLink
                to="/profile"
                severity="contrast"
                fontSize="l"
                size="m"
                label="Вернуться на главную"
            />
        </div>
    );
};
