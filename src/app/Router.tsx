import { useEffect, useState } from '../reactor/index';

export interface IRoute {
    path: string;
    component: any;
    props?: any;
}

export const Route = ({ path, component }: IRoute) => {
    return path === window.location.pathname ? component : null;
};

export const Router = ({ children: routes }: any) => {
    console.log(routes);
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
    return Component ? <Component /> : null;
};
