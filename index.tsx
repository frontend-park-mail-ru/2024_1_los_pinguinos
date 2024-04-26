import { Router, Route } from './src/app/Router';
// import Home from './src/pages/main/main.js';
import Login from './src/pages/login/login';
// import Register from './src/pages/register/register.js';
import { Landing } from './src/pages/landing/landing';
// import error404 from './src/pages/404/404.js';
// import Profile from './src/pages/profile/profile.js';
import './index.css';
// import Matches from './src/pages/matches/matches.js';

const routes = [
    new Route('/', Landing, false, '/main'),
    new Route('/login', Login, false, '/main'),
    // new Route('/register', new Register(), false, '/main'),
    // new Route('/main', new Home(), true),
    // new Route('/profile', new Profile(), true),
    // new Route('/matches', new Matches(), true),
    // new Route('/offline', new error404(true)),
    // new Route('*', new error404()),
];

const router = new Router(routes);