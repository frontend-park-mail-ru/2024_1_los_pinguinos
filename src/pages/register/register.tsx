import RegisterForm from '../../features/registerform/index';

/**
 * A Register page component that renders the registration form inside a wrapper.
 *
 * @function Register
 * @returns {JSX.Element} The rendered Register component.
 */
export const Register = () => {
    return <div className="wrapper">{RegisterForm()}</div>;
};
