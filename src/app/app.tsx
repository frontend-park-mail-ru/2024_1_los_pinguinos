import { Router, Route, redirectTo } from './Router';
import {
    Landing,
    Login,
    Register,
    PageNotFound,
    MainPage,
    ChatPage,
    MatchPage,
    Profile,
    PageOffline,
} from '../pages/index';
import { createStore } from './store';
import { userReducer } from '../entities/person/model/reducer';
export const store = createStore(userReducer);

// let channel: BroadcastChannel | null = null;
// if (typeof navigator.serviceWorker !== 'undefined') {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker
//             .register('./sw.js')
//             .then((registration) => {
//                 registration.addEventListener('updatefound', () => {
//                     const newWorker = registration.installing;
//                     newWorker.addEventListener('statechange', () => {
//                         channel.postMessage('state changed');
//                     });
//                 });
//             })
//             .catch(() => {
//                 return;
//             });

//         let refreshing: any;
//         navigator.serviceWorker.addEventListener('controllerchange', () => {
//             if (refreshing) return;
//             window.location.reload();
//             refreshing = true;
//         });
//     });
//     channel = new BroadcastChannel('sw-messages');
//     channel.addEventListener('message', (event) => {
//         if (event.data.offline && !navigator.onLine) {
//             redirectTo('/offline');
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
// export { channel };
console.log('rerender');

const App = () => {
    return (
        <Router>
            <Route path="/" component={Landing} />
            <Route path="/main" component={MainPage} isSecure={true} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/chats" component={ChatPage} isSecure={true} />
            <Route path="/matches" component={MatchPage} isSecure={true} />
            <Route path="/profile" component={Profile} isSecure={true} />
            <Route path="/offline" component={PageOffline} />
            <Route path="*" component={PageNotFound} />
        </Router>
    );
};

export default App;
