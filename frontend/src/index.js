import React , { Suspense }from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { createStore2, createPersistor } from "./store"; 
import "./i18next";



 
ReactDOM.render(
    <Provider store={createStore2()}>
      <PersistGate loading={null} persistor={createPersistor()}>
        <Suspense fallback={(<div>loading ....</div>)}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. 
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
