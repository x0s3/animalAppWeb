import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path : 'animales',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Animales = require('./containers/AnimalesContainer').default;
      const reducer = require('./modules/animales').default;
      injectReducer(store, { key: 'animales', reducer });
      cb(null, Animales);
    }, 'animales')
  }
});
