import { ButtonLink } from '../../shared/ui/index';

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
