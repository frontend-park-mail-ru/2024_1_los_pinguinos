import {Router, Route} from './src/app/Router/Router.js';
import Home from './src/pages/main/main.ts';
import Login from './src/pages/login/login.ts';
// import Register from './src/pages/register/register.js';
import Landing from './src/pages/landing/landing.ts';
// import error404 from './src/pages/404/404.js';
// import Profile from './src/pages/profile/profile.js';
import './index.css';
import Matches from './src/pages/matches/matches.ts';
import { createStore } from './src/app/store/redux-kids.ts';
import { userReducer } from './src/entities/person/model/reducer.ts';

const store = createStore(userReducer);
export {store};

if (typeof navigator.serviceWorker !== 'undefined') {
    window.addEventListener('load', () => {navigator.serviceWorker.register('/sw.js');});
}

const routes = [
    new Route('/', new Landing(), false, '/main'),
    new Route('/login', new Login(), false, '/main'),
    // new Route('/register', new Register(), false, '/main'),
    new Route('/main', new Home(), true),
    // new Route('/profile', new Profile(), true),
    new Route('/matches', new Matches(), true),
    // new Route('/offline', new error404(true)),
    // new Route('*', new error404()),
];
const router = new Router(routes);

export default router;
