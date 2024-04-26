// import loginTemplate from './login.hbs';
// import FormHandler from '../../components/form/formHandler.js';
// import componentHandler from '../../components/basic/ComponentHandler.js';
import LoginForm from '../../features/loginform/index';
import Header from '../../widgets/header/index'

// const formHandler = new FormHandler();
export const Login = () => {
    return (
        <div>
            <Header />
            <div className="wrapper">
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
