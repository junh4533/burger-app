import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-1f1d0-default-rtdb.firebaseio.com/",
});

export default instance;
