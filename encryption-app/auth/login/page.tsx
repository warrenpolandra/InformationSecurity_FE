'use client'
import "../styles.css";
// pages/auth/login.js
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  
    const storedData = localStorage.getItem(username);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.password === password) {
        alert("Selamat datang " + username + "!");
        router.push(`/auth/main?username=${username}&password=${password}`);
      } else {
        alert("Masukkan password yang benar!");
      }
    } else {
      alert("Masukkan username dan password yang benar!");
    }
  };  

  return (
    <div>
      {/* <h1>Login Page</h1> */}
      <div className="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">Login</h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleLogin}>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Username"
                            required
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <label>Username</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label>Password</label>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <button type="submit" className="btn btn-primary">
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center py-3">
                      <div className="small">
                        <Link href="/auth/register">Need an account? Sign up!</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
      <Link href="/auth/register">Need an account? Sign up!</Link>
    </div>
  );
}