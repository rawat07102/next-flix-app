import axios from "axios";

export default axios.create({
  // baseURL: "https://nest-flix-server.herokuapp.com",
  baseURL: "http://localhost:4000",
  withCredentials: true,
});
