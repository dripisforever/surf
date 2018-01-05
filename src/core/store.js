import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import sagas from './sagas';
import throttle from 'lodash/throttle';
import {loadState, saveState} from './connectivity/localStorage';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const persistedState = loadState();
  let middleware = applyMiddleware(sagaMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  const store = createStore(rootReducer, {...persistedState}, middleware);


  store.subscribe(throttle(() => {
    const state = store.getState();
      saveState({
        login: state.login,
      });
    }, ));
  sagaMiddleware.run(sagas);
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  return store;
}
