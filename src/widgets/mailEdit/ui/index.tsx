import { Modal, Button, Input } from '../../../shared/ui';
import { useState, useEffect } from '../../../reactor';
import { updateFormError, validateInput } from '../../../shared/lib';
import { updateEmail } from '../../../entities/session/api';

const MailEdit = () => {
    const [active, setActive] = useState(false);
    const [currentMail, setCurrentMail] = useState('test');
    const [mailError, setMailError] = useState('');
    const [mail, setMail] = useState(currentMail);
    const [dialogError, setDialogError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        updateFormError({
            type: 'email',
            value: currentMail,
            error: mailError,
            setError: setDialogError,
            errorMessage: 'Введите email в формате mail@domain.ru',
        });
        return () => {};
    }, [mailError]);

    async function handleSave() {
        if (!mail || !password) {
            if (!mail) {
                setMailError('Поле не может быть пустым.');
            }
            if (!password) {
                setPasswordError('Поле не может быть пустым.');
            }
            return;
        }
        if (!mailError && !passwordError) {
            const passwordValid = validateInput('password', password);
            if (!passwordValid) {
                setDialogError('Что-то пошло не так');
                return;
            }
            try {
                const response = await updateEmail(mail, password);
                setDialogError('');
                setActive(false);
            } catch {
                setDialogError('Что-то пошло не так');
            }
        }
    }

    return (
        <div className="profile__settings--row">
            <span
                className="icon-cursor"
                style="color: var(--color__light--primary); font-size: large; font-weight: 600;"
            ></span>
            <div className="profile__settings--column">
                <span className="profile__text">Ваша почта</span>
                <span className="profile__text">{mail}</span>
            </div>
            <Button
                icon="icon-pencil-square"
                fontSize="l1"
                severity="edit"
                onClick={() => setActive(true)}
            />
            <Modal active={active} setActive={setActive}>
                <div className="dialog">
                    <span className="dialog__title">Изменить почту</span>
                    <span className="dialog__info">
                        Введите новую почту и пароль
                    </span>
                    {Input({
                        type: 'email',
                        label: 'Новый email',
                        placeholder: 'Новый email',
                        value: mail,
                        validate: true,
                        error: mailError,
                        setError: setMailError,
                        onInput: (event) => {
                            setCurrentMail(event.target.value);
                        },
                        onChange: (event) => {
                            setMail(event.target.value);
                        },
                    })}
                    {Input({
                        label: 'Текущий пароль',
                        type: 'password',
                        placeholder: 'Введите текущий пароль',
                        autocomplete: 'current-password',
                        error: passwordError,
                        setError: setPasswordError,
                        onInput: (event) => {
                            setPassword(event.target.value);
                        },
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

export default MailEdit;
