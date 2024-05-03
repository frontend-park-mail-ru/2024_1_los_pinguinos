import { Router, Route } from './Router';
import { Landing } from '../pages/landing/landing';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import MainPage from '../pages/main/main';

const App = () => {
    return (
        <Router>
            <Route path="/" component={Landing} />
            <Route path="/main" component={MainPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Router>
    );
};

export default App;
