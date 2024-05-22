import { Modal, Button, Input } from '../../../shared/ui';
import { useState, useEffect } from '../../../reactor';
import { updateFormError, validateInput } from '../../../shared/lib';
import { updateEmail } from '../../../entities/session/api';
import { store } from '../../../app/app';
import { clsx } from '../../../clsx';

/**
 * A MailEdit component that renders a form for editing the user's email.
 *
 * @function MailEdit
 * @returns {JSX.Element} The rendered mail edit component.
 */
const MailEdit = () => {
    const userEmail = store.getState().email;
    const [active, setActive] = useState(false);
    const [currentMail, setCurrentMail] = useState(userEmail);
    const [mailError, setMailError] = useState('');
    const [email, setMail] = useState(currentMail);
    const [dialogError, setDialogError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [displayMail, setDisplayMail] = useState(currentMail);

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

    /**
     * Handles the save action for updating the email.
     *
     * @function handleSave
     */
    async function handleSave() {
        if (!email || !password) {
            if (!email) {
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
                const response = await updateEmail(email, password);
                store.dispatch({
                    type: 'UPDATE_SOMETHING',
                    payload: { email: currentMail },
                });
                setDisplayMail(email);
                setDialogError('');
                setActive(false);
                setPassword('');
            } catch {
                setDialogError('Что-то пошло не так');
            }
        }
    }

    return (
        <div className="profile__settings--row">
            <span
                className="icon-envelope-at"
                style="color: var(--color__light--primary); font-size: large; font-weight: 600;"
            ></span>
            <div className="profile__settings--column">
                <span className="profile__text">Ваша почта</span>
                <span className="profile__text">{displayMail}</span>
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
                    <span className="dialog__title">Изменить почту</span>
                    <span className="dialog__info">
                        Введите новую почту и пароль
                    </span>
                    {Input({
                        type: 'email',
                        label: 'Новый email',
                        placeholder: 'Новый email',
                        value: email,
                        validate: true,
                        error: mailError,
                        setError: setMailError,
                        onInput: (event) => {
                            setCurrentMail(event.target.value);
                        },
                        onChange: (event) => {
                            setMail(event.target.value);
                        },
                        maxlength: 320,
                        autocomplete: 'email',
                    })}
                    {Input({
                        label: 'Текущий пароль',
                        type: 'password',
                        placeholder: 'Введите текущий пароль',
                        autocomplete: 'current-password',
                        error: passwordError,
                        value: password,
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
                    <span
                        className={clsx(
                            !dialogError && 'any--none',
                            'dialog__error',
                        )}
                    >
                        {dialogError}
                    </span>
                </form>
            </Modal>
        </div>
    );
};

export default MailEdit;
