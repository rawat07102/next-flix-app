import axios from "axios";

export default axios.create({
  baseURL: "http://nest-flix-server.herokuapp.com",
  // baseURL: "http://localhost:4000",
  withCredentials: true,
});
