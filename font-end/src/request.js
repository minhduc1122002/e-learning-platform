import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmQ2YTMzMjViOTMwMTAzN2IwZDE3MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NzE0NDEwOCwiZXhwIjoxNjQ3MjMwNTA4fQ.ECrK9K8DYRujROfD_ZNGWBI3jhnf_-owN7N2MizkvD8"


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `gray ${TOKEN}` },
});