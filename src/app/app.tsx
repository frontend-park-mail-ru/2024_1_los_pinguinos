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
import { ConfirmationPopup } from '../widgets/index';
import { createStore } from './store';
import { userReducer } from '../entities/person/model/reducer';
import { useState } from '../reactor/index';
export const store = createStore(userReducer);

const App = () => {
    const [active, setActive] = useState(false);
    const [reloadCallback, setCallback] = useState(() => {});
    let channel: BroadcastChannel | null = null;
    const showRefreshUI = (
        registration: ServiceWorkerRegistration,
        channel: BroadcastChannel,
    ) => {
        setCallback(() => {
            return () => {
                if (!registration.waiting) {
                    return;
                }
                channel.postMessage({ type: 'SKIP_WAITING' });
            };
        });
        setActive(true);
    };

    const onNewServiceWorker = (
        registration: ServiceWorkerRegistration,
        callback: Function,
    ) => {
        if (registration.waiting) {
            return callback();
        }

        const listenInstalledStateChange = () => {
            registration.installing.addEventListener(
                'statechange',
                function (event: any) {
                    if (event.target.state === 'installed') {
                        callback();
                    }
                },
            );
        };
        if (registration.installing) {
            return listenInstalledStateChange();
        }
        registration.addEventListener(
            'updatefound',
            listenInstalledStateChange,
        );
    };

    if (typeof navigator.serviceWorker !== 'undefined') {
        channel = new BroadcastChannel('sw-messages');
        window.addEventListener('load', function () {
            let refreshing: boolean;
            navigator.serviceWorker.addEventListener(
                'controllerchange',
                function (event) {
                    if (refreshing) return;
                    refreshing = true;
                    window.location.reload();
                },
            );

            navigator.serviceWorker
                .register('/sw.js')
                .then(function (registration) {
                    if (!navigator.serviceWorker.controller) {
                        return;
                    }
                    registration.update();

                    onNewServiceWorker(registration, () => {
                        showRefreshUI(registration, channel);
                    });
                });
        });
        channel.addEventListener('message', (event) => {
            if (event.data.offline && !navigator.onLine) {
                redirectTo('/offline');
            }
        });
        window.addEventListener('error', (event) => {
            channel.postMessage({
                type: 'ERROR_OCCURRED',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
            });
        });
    }
    return (
        <div>
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
            <ConfirmationPopup
                active={active}
                setActive={setActive}
                popupTitle="Вышло обновление"
                popupDescription="Пожалуйста, обновите страницу"
                callback={reloadCallback}
                acceptLabel="Обновить"
                forced
            />
        </div>
    );
};

export default App;
