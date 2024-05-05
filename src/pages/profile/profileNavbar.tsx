import { Button } from '../../shared/ui/index';

export const ProfileNavbar = ({
    state,
    setState,
    title,
    setTitle,
    setActive,
    setCallback,
}: any) => {
    return (
        <div className="profile__navbar-wrapper">
            <h1 className="profile__text profile__text--title navbar__text">
                {title}
            </h1>
            <div className="profile__navbar-content">
                <Button
                    label="Профиль"
                    icon="icon-person"
                    severity={state === 0 ? 'success' : undefined}
                    fontSize="l1"
                    size="max-width"
                    navbar
                    onClick={() => {
                        setState(0);
                        setTitle('Профиль');
                    }}
                />
                <Button
                    label="Настройки"
                    icon="icon-gear"
                    severity={state === 1 ? 'success' : undefined}
                    fontSize="l1"
                    size="max-width"
                    navbar
                    onClick={() => {
                        setState(1);
                        setTitle('Безопасность');
                    }}
                />
                <Button
                    label="Выход"
                    icon="icon-box-arrow-right"
                    severity="contrast"
                    fontSize="l1"
                    size="max-width"
                    navbar
                    onClick={() => {
                        setActive(true);
                        setCallback();
                    }}
                />
            </div>
        </div>
    );
};
