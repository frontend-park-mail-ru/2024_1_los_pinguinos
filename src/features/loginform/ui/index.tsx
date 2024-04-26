import { useState } from '../../../reactor';
import { login } from '../../../entities/session/api';
import { Link } from '../../../shared/routing/link';
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            localStorage.setItem('Csrft', response.csrft);
            setError(false);
        } catch (error) {
            setError(true);
        }
    };

    return (
        <div className="form">
            <div className='form__header'>
                <Link back={true}>
                    <button className={'button chevron--left'}></button>
                </Link>
                <p class='form__title'>Вход</p>
            </div>
            <div className="form__field">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form__field">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <div className="form__error">Ошибка входа</div>}
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
};

export default LoginForm;
