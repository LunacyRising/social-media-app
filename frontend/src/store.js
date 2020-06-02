import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import allReducers from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["messagesReducer", "modalsReducer"] 
};

const persistedReducer = persistReducer(persistConfig, allReducers);

//STORE  GLOBAL STATE
const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middleware))
);
let persistor = persistStore(store);
/////////////////////////////////////////////////
export const createStore2 = () => {
  return store;
};

export const createPersistor = () => {
  return persistor;
};
