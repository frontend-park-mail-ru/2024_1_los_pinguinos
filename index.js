import {Router} from './src/components/Router/Router.js';
import {Route} from './src/components/Router/Router.js';
import Home from './src/pages/main/main.js';
import Login from './src/pages/login/login.js';
import Register from './src/pages/register/register.js';
import Landing from './src/pages/landing/landing.js';
import error404 from './src/pages/404/404.js';
import Profile from './src/pages/profile/profile.js';
import './index.css';
import Matches from './src/pages/matches/matches.js';
import { createStote } from './src/store/redux-kids.js';
import { userReducer } from './src/models/user/reduser.js';

const store = createStote(userReducer);
export {store};

const routes = [
    new Route('/', new Landing()),
    new Route('/login', new Login(), false, '/main'),
    new Route('/register', new Register(), false, '/main'),
    new Route('/main', new Home(), true),
    new Route('/profile', new Profile(), true),
    new Route('/matches', new Matches(), true),
    new Route('*', new error404()),
];
const router = new Router(routes);

export default router;
