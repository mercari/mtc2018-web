import { compose, createStore } from 'redux';
import reducer, { IRootState } from './reducer';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default createStore<IRootState, any, any, any>(
  reducer,
  composeEnhancers()
);
