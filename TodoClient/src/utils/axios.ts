// Make function to get data from API using axios

import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7257/api",
});

export default api;
