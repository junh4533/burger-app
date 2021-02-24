import React from "react";
import ReactDOM from "react-dom";
import "./index.module.scss";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./store/reducer";

// axios.interceptors.request.use(req => {
//     return req;
// })

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
