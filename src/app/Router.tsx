import { useEffect, useState } from '../reactor/index';
import  Layout from '../pages/layout/layout';

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

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const currentRoute = routes.find((route: IRoute) => {
        return route.props.path === currentPath;
    });
    const Component = currentRoute.props.component;
    console.log('currentRoute', currentRoute);
    const isSecure = currentRoute.props.isSecure;
    console.log('isSecure', isSecure);
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
