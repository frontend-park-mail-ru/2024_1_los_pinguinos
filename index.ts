import { Router } from './src/components/Router/Router';
import { Route } from './src/components/Router/Router';
// import Home from './src/pages/main/main.js';
import { Login } from './src/pages/login/login.jsx';
// import Register from './src/pages/register/register.js';
import { Landing } from './src/pages/landing/landing.jsx';
// import error404 from './src/pages/404/404.js';
// import Profile from './src/pages/profile/profile.js';
import './index.css';
// import Matches from './src/pages/matches/matches.js';
import { createStote } from './src/store/redux-kids.js';
import { userReducer } from './src/models/user/reduser.js';

// let channel = null;
// if (typeof navigator.serviceWorker !== 'undefined') {
//     window.addEventListener('load', () => {navigator.serviceWorker.register('/sw.js');});
//     channel = new BroadcastChannel('sw-messages');
//     channel.addEventListener('message', (event) => {
//         if (event.data.offline && !navigator.onLine) {
//             router.redirectTo('/offline');
//         }
//     });
//     window.addEventListener('error', (event) => {
//         channel.postMessage({
//             type: 'ERROR_OCCURRED',
//             message: event.message,
//             filename: event.filename,
//             lineno: event.lineno,
//         });
//     });
// }
// export {channel};

const store = createStote(userReducer);
export { store };

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

export default router;