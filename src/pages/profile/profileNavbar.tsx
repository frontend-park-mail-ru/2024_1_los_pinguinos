import { Button } from '../../shared/ui/index';

export const ProfileNavbar = ({ state, setState }: any) => {
    return (
        <div className="profile__navbar-wrapper">
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
                    }}
                />
                <Button
                    label="Выход"
                    icon="icon-box-arrow-right"
                    severity="contrast"
                    fontSize="l1"
                    size="max-width"
                    navbar
                />
            </div>
        </div>
    );
};
