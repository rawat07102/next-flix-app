import axios from "axios";

export default axios.create({
  baseURL: "http://nest-flix-server.herokuapp.com",
  withCredentials: true,
});
