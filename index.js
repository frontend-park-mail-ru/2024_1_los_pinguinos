import {Router} from './src/components/Router/Router.js';
import {Route} from './src/components/Router/Router.js';
import Home from './src/pages/main/main.js';
import Login from './src/pages/login/login.js';
import Register from './src/pages/register/register.js';

const routes = [
    new Route('/', new Home()),
    new Route('/login', new Login()),
    new Route('/register', new Register()),
];
new Router(routes);

// const routes = {
//     '/': Home,
//     '/login': Login,
//     '/register': Register
//   };

//   function router() {
//     const path = window.location.pathname;

//     const component = routes[path];

//     if (component) {
//       document.getElementById('app').innerHTML = component.render();
//     } else {
//       // Если компонент не найден, отображаем сообщение об ошибке или перенаправляем на домашнюю страницу
//       document.getElementById('app').innerHTML = '404 - Страница не найдена';
//     }
//   }

//   function initRouter() {
//     window.addEventListener('load', router);
//     window.addEventListener('hashchange', router);
//   }

//   initRouter();
