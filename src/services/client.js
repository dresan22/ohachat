import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000",
});

client
  .post("/login", {
    email: "user@example.com",
    password: "pa$$w0rd",
  })
  .then((response) => {
    console.log(`🚀 ~ response:`, response);
  })
  .catch((error) => {
    console.log(`🚀 ~ error:`, error);
  });
