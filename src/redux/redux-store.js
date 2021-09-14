import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import rootReducers from "./reducers";
import saga from "./sagas/index";

const logger = createLogger({
  predicate: true,
  collapsed: true,
  duration: true,
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore(state) {
  const middlewares = [sagaMiddleware];
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === "development") middlewares.push(logger);
  const store = createStore(
    rootReducers,
    state,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(saga);
  return store;
}
export default configureStore;
