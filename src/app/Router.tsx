import { useEffect, useState } from '../reactor/index';
import Layout from '../pages/layout/layout';
import { store } from './app';

export interface IRoute {
    path: string;
    component: any;
    isSecure?: boolean;
    props?: any;
}

export const Route = ({ path, component }: IRoute) => {
    return path === window.location.pathname ? component : null;
};

export const Router = ({ children: routes }: any) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const authStatus = store.getState().authStatus;

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
    let currentRoute = routes.find((route: IRoute) => {
        return route.props.path === currentPath || route.props.path === '*';
    });
    const changeRouteIfNeeded = (
        shouldRedirect: boolean,
        targetPath: string,
    ) => {
        if (shouldRedirect) {
            history.replaceState(null, '', targetPath);
            setCurrentPath(targetPath);
            const foundRoute = routes.find(
                (route: { props: { path: any } }) =>
                    route.props.path === targetPath,
            );
            return foundRoute ? foundRoute.props : {};
        }
        return null;
    };

    let { component: Component, isSecure, path } = currentRoute.props;

    const noAuthRedirect = changeRouteIfNeeded(
        isSecure && !authStatus && path !== '*',
        '/login',
    );
    const authRedirect = changeRouteIfNeeded(
        !isSecure && authStatus && path !== '*',
        '/profile',
    );

    if (noAuthRedirect) {
        Component = noAuthRedirect.component;
        isSecure = !isSecure;
    }

    if (authRedirect) {
        Component = authRedirect.component;
        isSecure = !isSecure;
    }

    return Component ? (
        isSecure ? (
            <Layout>
                <Component />
            </Layout>
        ) : (
            <Component />
        )
    ) : null;
};

export const navigateTo = (url: string) => {
    history.pushState(null, '', url);
    window.dispatchEvent(new Event('popstate'));
};

export const redirectTo = (url: string) => {
    history.replaceState(null, '', url);
    window.dispatchEvent(new Event('popstate'));
};
