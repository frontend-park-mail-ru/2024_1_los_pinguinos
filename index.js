import {Router} from './src/components/Router/Router.js';
import {Route} from './src/components/Router/Router.js';
import Home from './src/pages/main/main.js';
import Login from './src/pages/login/login.js';
import Register from './src/pages/register/register.js';
import Landing from './src/pages/landing/landing.js';
import './index.css';

const routes = [
    new Route('/', new Home()),
    new Route('/login', new Login()),
    new Route('/register', new Register()),
    new Route('/main', new Home()),
    new Route('*', new Landing()),
];
new Router(routes);
