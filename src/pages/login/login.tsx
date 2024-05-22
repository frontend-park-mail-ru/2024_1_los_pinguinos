import { LoginForm } from '../../features/loginform/index';

/**
 * A Login page component that renders the login form inside a wrapper.
 *
 * @function Login
 * @returns {JSX.Element} The rendered Login component.
 */
export const Login = () => {
    return <div className="wrapper">{LoginForm()}</div>;
};

export default Login;
