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

export const Route = ({ path, component }: IRoute) => {
    return path === window.location.pathname ? component : null;
};

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

export const navigateTo = (url: string) => {
    history.pushState(null, '', url);
    window.dispatchEvent(new Event('popstate'));
};

export const redirectTo = (url: string) => {
    history.replaceState(null, '', url);
    window.dispatchEvent(new Event('popstate'));
};
