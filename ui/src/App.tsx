

import './App.css'
import { signUp, signIn, useSession } from "./Auth/auth-client";
import { useEffect } from "react";

function App() {
  const { data: session, isLoading } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  const handleSignup = async () => {
    await signUp({ email: "test@example.com", password: "password123" });
  };

  const handleLogin = async () => {
    await signIn({ email: "test@example.com", password: "password123" });
  };

  return (
    <div>
      <h1>BetterAuth Example</h1>
      {session ? (
        <p>Logged in as {session.user.email}</p>
      ) : (
        <>
          <button onClick={handleSignup}>Signup</button>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
}

export default App;
