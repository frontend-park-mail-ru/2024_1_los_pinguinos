import {Router} from './src/components/Router/Router.js';
import {Route} from './src/components/Router/Router.js';
import Home from './src/pages/main/main.js';
import Login from './src/pages/login/login.js';
import Register from './src/pages/register/register.js';
import Landing from './src/pages/landing/landing.js';
import './index.css';

const routes = [
    new Route('/', new Landing()),
    new Route('/login', new Login(), false, '/main'),
    new Route('/register', new Register(), false, '/main'),
    new Route('/main', new Home(), true),
    new Route('*', new Landing()),
];
const router = new Router(routes);
export default router;
