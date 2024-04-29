import { Router, Route } from './Router';
import { Landing } from '../pages/landing/landing';
import { Login } from '../pages/login/login';
import MainPage from '../pages/main/main';
import MatchesPage from '../pages/matches/matches';
import { Register } from '../pages/register/register';
import { Button } from '../shared/ui/button/button';
import { Link } from '../shared/routing/link';
import { Input } from '../shared/ui/input/input';
import { InputPhoto } from '../shared/ui/input/inputPhoto';
import { useEffect, useState } from '../reactor/index';
import { clsx } from '../clsx/index';
const testRoute = () => {
    const [state, setState] = useState('abc');
    useEffect(() => {
        console.log(state);
    }, [state]);
    const [loading, setLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    return (
        <div>
            <Input
                disabled={state.length > 5}
                type="password"
                placeholder="hehe"
                label="hoho"
                size="m"
                value={state}
                autofocus={true}
                icon="icon-eye-slash"
                onInput={(event: any) => {
                    setState(event.target.value);
                }}
            />
            <InputPhoto
                accept="image/*"
                onUpload={(file) => {
                    console.log(file);
                    setLoading(true);
                    setCurrentImage(
                        'https://www.dictionary.com/e/wp-content/uploads/2018/05/pfp.png',
                    );
                }}
                onLoad={(result) => {
                    setTimeout(() => {
                        console.log('loaded image');
                        setLoading(false);
                    }, 1000);
                }}
                onDelete={() => {
                    setCurrentImage(null);
                }}
                loading={loading}
                currentImage={currentImage}
            />
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
