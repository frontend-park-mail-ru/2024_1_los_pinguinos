// import loginTemplate from './login.hbs';
// import FormHandler from '../../components/form/formHandler.js';
// import componentHandler from '../../components/basic/ComponentHandler.js';
import LoginForm from '../../features/loginform/index';
// const formHandler = new FormHandler();
export const Login = () => {
    return (
        <div className="wrapper">
            <LoginForm />
        </div>
    );
};

export default Login;
