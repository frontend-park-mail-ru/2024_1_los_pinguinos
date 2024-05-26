import { Router, Route, redirectTo, navigateTo } from './router';
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
import { checkAuth } from '../entities/session/api/index';
export const store = createStore(userReducer);
export const popupContext = { setActive: null, active: false } as any;

/**
 * Main application component that handles service worker registration,
 * updates, and routing.
 *
 * @function App
 * @returns {JSX.Element} The main application component.
 */
const App = () => {
    const setAuth = async () => {
        try {
            const response = await checkAuth();
            store.dispatch({ type: 'UPDATE_SOMETHING', payload: response });
        } catch {
            store.dispatch({ type: 'LOGOUT', payload: {} });
            store.dispatch({ type: 'UPDATE_AUTH', payload: false });
            redirectTo('/login');
        }
    };
    setAuth();
    const [active, setActive] = useState(false);
    const [reloadCallback, setCallback] = useState(() => {});

    /**
     * Shows the refresh UI by setting a callback to handle the service worker
     * update.
     *
     * @function showRefreshUI
     * @param {ServiceWorkerRegistration} registration - The service worker registration.
     */
    const showRefreshUI = (registration: ServiceWorkerRegistration) => {
        setCallback(() => {
            return () => {
                if (!registration.waiting) {
                    return;
                }
                registration.waiting.postMessage({
                    type: 'SKIP_WAITING',
                });
            };
        });
        setActive(true);
    };

    /**
     * Handles new service worker state changes and invokes the provided callback
     * when a new service worker is installed.
     *
     * @function onNewServiceWorker
     * @param {ServiceWorkerRegistration} registration - The service worker registration.
     * @param {Function} callback - The callback function to invoke when a new service worker is installed.
     */
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
                .then((registration) => {
                    if (!navigator.serviceWorker.controller) {
                        return;
                    }
                    registration.update();

                    onNewServiceWorker(registration, () => {
                        showRefreshUI(registration);
                    });
                })
                .catch((error) => {
                    error;
                    return;
                });
        });
        navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data.offline && !navigator.onLine) {
                redirectTo('/offline');
            }
        });
    }

    window.addEventListener('error', (event) => {
        if (
            'serviceWorker' in navigator &&
            navigator.serviceWorker.controller
        ) {
            navigator.serviceWorker.controller.postMessage({
                type: 'ERROR_OCCURRED',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
            });
        }
    });

    const [subActive, setSubActive] = useState(false);
    const [noSubError, setSubError] = useState('sub error');
    const noSubCallback = () => {
        setSubActive(false);
        setTimeout(() => {
            navigateTo('/profile?sub=pending');
        }, 200);
    };
    popupContext.active = subActive;
    popupContext.setActive = setSubActive;

    return (
        <div className="page-wrap">
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
                alternate
            />
            <ConfirmationPopup
                active={popupContext.active}
                setActive={popupContext.setActive}
                popupTitle="Нужна подписка"
                popupDescription={noSubError}
                callback={noSubCallback}
                acceptLabel="Оформить подписку"
                cancelLabel="Отмена"
                alternate
            />
        </div>
    );
};

export default App;
