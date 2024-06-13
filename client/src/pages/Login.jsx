import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';


const URL = "http://localhost:7001/api/auth/login"


export const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();

  //handling the input value
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(user);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("login form", response);

      const res_server = await response.json();
      if (response.ok) {
        storeTokenInLS(res_server.token);
        //localStorage.setItem("token",res_server.token);
        toast.success("Login successful");
        setUser({ email: "", password: "" });
        navigate("/")
        window.location.reload();
      } else {
        toast.error(res_server.extraDetails? res_server.extraDetails: res_server.message);
        console.log("Invalid Credentials");
      }

    } catch (error) {
      console.log("Login Error", error);
    }



    //alert(user);
  }
  return (
    <>

      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="login-image reg-img">
                <img
                  src="/images/login.png"
                  alt="a nurse with a cute look"
                  width="470"
                  height="500"
                />
              </div>

              {/* lets tackle registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login to enjoy our free tools</h1>
                <br />

                <form onSubmit={handleSubmit}>

                  <div>
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" placeholder="email" id="email" required autoComplete="off"
                      value={user.email}
                      onChange={handleInput} />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" placeholder="password" id="password" required autoComplete="off"
                      value={user.password}
                      onChange={handleInput} />
                  </div>

                  <div className="dontHaveAnAccount">
                    <NavLink to="/register">
                    <h2>Don't have an account. Register here</h2>
                    </NavLink>
                  </div>
                  <div>
                    <h2>
                      Use <br />Email: admin@admin.com <br />
                      Password: Admin01 <br />
                      to access admin panel
                    </h2>
                  </div>

                  <br />

                  <button type="submit" className="btn btn-submit">Login Now</button>
                </form>
              </div>
            </div>
          </div>

        </main>
      </section>
    </>
  );
}