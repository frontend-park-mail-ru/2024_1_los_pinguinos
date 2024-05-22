import { useEffect, useState } from '../reactor/index';
import Layout from '../pages/layout/layout';
import { store } from './app';
import { updateBackground } from '../shared/lib/index';

export interface IRoute {
    path: string;
    component: any;
    isSecure?: boolean;
    props?: any;
}

/**
 * Route component that renders the component associated with the path
 * if it matches the current window location pathname.
 *
 * @function Route
 * @param {IRoute} props - The properties of the route.
 * @returns {JSX.Element | null} The component to render or null if the path does not match.
 */
export const Route = ({ path, component }: IRoute) => {
    return path === window.location.pathname ? component : null;
};

/**
 * Router component that handles navigation and rendering of routes.
 *
 * @function Router
 * @param {IRoute<any>[]} routes - The routes passed to the Router component.
 * @returns {JSX.Element | null} The rendered route component or null if no matching route is found.
 */
export const Router = ({ children: routes }: any) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const authStatus = store.getState().authStatus;
    const defaultSecurePath = '/profile';
    const defaultInsecurePath = '/login';

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
        };
        if (!isSecure && authStatus && path !== '*' && path !== '/offline') {
            setCurrentPath(defaultSecurePath);
            history.replaceState(null, '', defaultSecurePath);
        }
        if (isSecure && !authStatus && path !== '*' && path !== '/offline') {
            setCurrentPath(defaultInsecurePath);
            history.replaceState(null, '', defaultInsecurePath);
        }
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    useEffect(() => {
        updateBackground(currentPath);
    }, [currentPath]);

    let currentRoute = routes.find((route: IRoute) => {
        return route.props.path === currentPath || route.props.path === '*';
    });

    let { component: Component, isSecure, path } = currentRoute.props;

    const renderData = <Component />;

    return renderData ? (
        isSecure ? (
            <Layout>
                <Component />
            </Layout>
        ) : (
            renderData
        )
    ) : null;
};

/**
 * Navigates to a new URL by pushing a new state to the history stack.
 *
 * @function navigateTo
 * @param {string} url - The URL to navigate to.
 */
export const navigateTo = (url: string) => {
    history.pushState(null, '', url);
    window.dispatchEvent(new Event('popstate'));
};

/**
 * Redirects to a new URL by replacing the current state in the history stack.
 *
 * @function redirectTo
 * @param {string} url - The URL to redirect to.
 */
export const redirectTo = (url: string) => {
    history.replaceState(null, '', url);
    window.dispatchEvent(new Event('popstate'));
};
