import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path : 'noticias',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Noticias = require('./containers/NoticiasContainer').default;
      const reducer = require('./modules/noticias').default;
      injectReducer(store, { key: 'noticias', reducer });
      cb(null, Noticias);
    }, 'noticias')
  }
});
