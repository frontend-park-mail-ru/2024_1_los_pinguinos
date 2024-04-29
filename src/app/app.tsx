import { Router, Route } from './Router';
import { Landing } from '../pages/landing/landing';
import { Login } from '../pages/login/login';
import MainPage from '../pages/main/main';
import MatchesPage from '../pages/matches/matches';
import { Register } from '../pages/register/register';
import { Button } from '../shared/ui/button/button';
import { Link } from '../shared/routing/link';
import { Input } from '../shared/ui/input/input';
import { useState } from '../reactor/index';
const testRoute = () => {
    return (
        <Input
            type="password"
            placeholder="hehe"
            label="hoho"
            size="m"
            autofocus={true}
            icon="icon-eye-slash"
        />
    );
};
const testRoute2 = () => {
    const [state, setState] = useState(0);
    return (
        <div
            className={`hehe ${state > 5 && state < 10 ? 'hihi' : ''}`}
            onClick={() => {
                setState((c) => c + 1);
            }}
        >
            {state}
        </div>
    );
};
const App = () => {
    return (
        <Router>
            <Route path="/" component={testRoute}></Route>
            <Route path="/landing" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Router>
    );
};

export default App;
