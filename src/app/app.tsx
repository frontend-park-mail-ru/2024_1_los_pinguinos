import { Router, Route } from './Router';
import { Landing } from '../pages/landing/landing';
import { Login } from '../pages/login/login';
import MainPage from '../pages/main/main';
import MatchesPage from '../pages/matches/matches';
import { Register } from '../pages/register/register';
import { Button } from '../shared/ui/button/button';

const App = () => {
    return (
        <Router>
            <Route path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Router>
    );
};

export default App;
