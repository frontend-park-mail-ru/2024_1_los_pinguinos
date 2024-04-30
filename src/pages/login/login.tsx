import { LoginForm } from '../../features/loginform/index';
import { useEffect } from '../../reactor/index';

export const Login = () => {
    return <div className="wrapper">{LoginForm()}</div>;
};

export default Login;
