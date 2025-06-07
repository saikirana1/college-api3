import { createAuthClient } from "better-auth/client";
import { usernameClient } from "better-auth/client/plugins";
const client = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [usernameClient()],
});
async function signup() {
  await client.signUp.email(
    {
      email: "faiz@konic.net",
      password: "abc123!@#",
      name: "Faizuddin",
      username: "faiz",
    },
    {
      onSuccess(response) {
        console.log("success");
        console.log(response.data);
      },
      onError(response) {
        console.log("failure");
        console.log(response.error);
      },
    },
  );
}
async function sample() {
  const response = await fetch("http://localhost:3000/v1/User").then((res) =>
    res.json(),
  );
  console.log(response);
}
async function signin() {
  await client.signIn.email(
    {
      email: "faiz@konic.net",
      password: "abc123!@#",
    },
    {
      onSuccess(response) {
        console.log("Login success");
        console.log(response.data);
      },
      onError(response) {
        console.log("Login Failure");
        console.log(response.error);
      },
    },
  );
}
signin().then().catch(console.error);