import CoreLayout from '../layouts/PageLayout/PageLayout';
import Home from './Home';
import CounterRoute from './Counter';
import NoticiasRoute from './Noticias';
import AnimalesRoute from './Animales';

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    CounterRoute(store),
    NoticiasRoute(store),
    AnimalesRoute(store)
  ]
});

export default createRoutes;
