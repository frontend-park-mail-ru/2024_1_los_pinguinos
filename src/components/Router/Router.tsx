import { useEffect, useState } from '../../reactor/index';
import { TNode, IFunctionalComponent } from '../../reactor/index';

type TLink = {
    to: string,
    children: TNode[],
}
export const Link = ({ to, children }: TLink) => { 
    const handleClick = (event: any) => { 
      event.preventDefault(); 
      window.history.pushState(null, null, to); 
      window.dispatchEvent(new Event('popstate')); 
    }; 
   
    return ( 
      <a href={to} onClick={handleClick}> 
        {children} 
      </a>
    ); 
  };
    interface IRoute {
        path: string,
        component: any,
    }
   type TRouter = {
    routes: IRoute[],
   }
  export const Router = ({ routes }: TRouter) => { 
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
   
    const currentRoute = routes.find((route) => route.path === currentPath); 
    return currentRoute ? currentRoute.component : null; 
  }; 
  
  export const Route = ({ path, component }: IRoute) => { 
    const currentPath = window.location.pathname; // Предположим, что у вас есть хук для получения текущего пути 

    return path === currentPath ? <component /> : null; 
  };
 
export const ProtectedRoute = ({ path, component } : IRoute) => { 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
 
  useEffect(() => { 
    // Ваша логика проверки авторизации здесь 
    // Например, проверка наличия токена аутентификации в localStorage 
    const token = localStorage.getItem('authToken'); 
    setIsAuthenticated(!!token); 
  }, []); 
 
  return isAuthenticated ? <component /> : null; 
}; 
 