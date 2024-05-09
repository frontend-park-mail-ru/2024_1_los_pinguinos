import { Modal, Button, Input } from '../../../shared/ui/index';
import { useState, useEffect } from '../../../reactor/index';
import { updateFormError, validateInput } from '../../../shared/lib/index';
import { updatePassword } from '../../../entities/session/api/index';

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
                <div className="dialog">
                    <span className="dialog__title">Изменить пароль</span>
                    <span className="dialog__info">
                        Введите старый и новый пароли
                    </span>
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
                    <span className="form__error">{dialogError}</span>
                </div>
            </Modal>
        </div>
    );
};

export default PasswordEdit;
