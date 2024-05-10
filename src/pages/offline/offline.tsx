import { ButtonLink } from '../../shared/ui/index';

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
