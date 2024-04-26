import { useState} from '../../../reactor';
// import {Link } from '../../../app/Router';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={'form'}>
            <div className={'form__field'}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={'form__field'}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {/* <Link to={'/'}>MAIN PAGE</Link> */}
        </div>
    );
};

export default LoginForm;
