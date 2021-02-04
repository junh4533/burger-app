import React from "react";
import ReactDOM from "react-dom";
import "./index.module.scss";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// axios.interceptors.request.use(req => {
//     return req;
// })

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
