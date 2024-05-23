import { Modal, Button, Input } from '../../../shared/ui/index';
import { useState, useEffect } from '../../../reactor/index';
import { updateFormError } from '../../../shared/lib/common/index';
import { validateInput } from '../../../shared/lib/input/index';
import { updatePassword } from '../../../entities/session/api/index';
import { clsx } from '../../../shared/lib/clsx/index';

/**
 * A PasswordEdit component that renders a form for editing the user's password.
 *
 * @function PasswordEdit
 * @returns {JSX.Element} The rendered password edit component.
 */
const PasswordEdit = () => {
    const [active, setActive] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [password, setPassword] = useState('');
    const [dialogError, setDialogError] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');

    useEffect(() => {
        updateFormError({
            type: 'password',
            value: password,
            error: passwordError,
            setError: setDialogError,
            errorMessage:
                'Пароль должен быть длиной от 8 до 32 символов. Разрешенны стандартные спец. символы',
        });
        return () => {};
    }, [passwordError]);

    /**
     * Handles the save action for updating the password.
     *
     * @function handleSave
     */
    async function handleSave() {
        if (!password || !oldPassword) {
            if (!password) {
                setPasswordError('Поле не может быть пустым.');
            }
            if (!oldPassword) {
                setOldPasswordError('Поле не может быть пустым.');
            }
            return;
        }
        if (!passwordError && !oldPasswordError) {
            const passwordValid = validateInput('password', password);
            const oldPasswordValid = validateInput('password', oldPassword);
            if (!passwordValid || !oldPasswordValid) {
                setDialogError('Что-то пошло не так');
                return;
            }
            try {
                const response = await updatePassword(password, oldPassword);
                setDialogError('');
                setActive(false);
                setPassword('');
                setOldPassword('');
            } catch {
                setDialogError('Что-то пошло не так');
            }
        }
    }

    return (
        <div className="profile__settings--row">
            <span
                className="icon-key"
                style="color: var(--color__light--primary); font-size: large; font-weight: 600;"
            ></span>
            <div className="profile__settings--column">
                <span className="profile__text">Ваш пароль</span>
                <span className="profile__text">********</span>
            </div>
            <Button
                icon="icon-pencil-square"
                fontSize="l1"
                severity="edit"
                onClick={() => setActive(true)}
            />
            <Modal active={active} setActive={setActive}>
                <form
                    className="dialog"
                    onSubmit={(event: any) => {
                        event.preventDefault();
                    }}
                >
                    <span className="dialog__title">Изменить пароль</span>
                    <span className="dialog__info">
                        Введите старый и новый пароли
                    </span>
                    {Input({
                        type: 'email',
                        autocomplete: 'email',
                        hidden: true,
                    })}
                    {Input({
                        label: 'Новый пароль',
                        type: 'password',
                        placeholder: 'Новый пароль',
                        autocomplete: 'new-password',
                        validate: true,
                        value: password,
                        onInput: (event) => {
                            setPassword(event.target.value);
                        },
                        error: passwordError,
                        setError: setPasswordError,
                        maxlength: 32,
                        minlength: 8,
                    })}
                    {Input({
                        label: 'Текущий пароль',
                        type: 'password',
                        placeholder: 'Текущий пароль',
                        autocomplete: 'current-password',
                        value: oldPassword,
                        onInput: (event) => {
                            setOldPassword(event.target.value);
                        },
                        error: oldPasswordError,
                        setError: setOldPasswordError,
                        maxlength: 32,
                        minlength: 8,
                    })}
                    <div className="dialog__button-wrap">
                        <Button
                            label="Отмена"
                            size="m"
                            fontSize="m"
                            severity="cancel"
                            onClick={() => {
                                setActive(false);
                            }}
                        />
                        <Button
                            label="Сохранить"
                            size="m"
                            fontSize="m"
                            severity="success"
                            onClick={handleSave}
                        />
                    </div>
                    <span
                        className={clsx(
                            'dialog__error',
                            !dialogError && 'any--none',
                        )}
                    >
                        {dialogError}
                    </span>
                </form>
            </Modal>
        </div>
    );
};

export default PasswordEdit;
