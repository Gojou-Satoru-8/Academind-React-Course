import { useDispatch } from "react-redux";
import classes from "./Auth.module.css";
import { authActions } from "../store";

const Auth = () => {
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    const values = new FormData(e.target);
    const valuesObj = Object.fromEntries(values);
    if (valuesObj.email.trim() === "user@example.com" && valuesObj.password.trim() === "sensei777X")
      dispatch(authActions.logIn());
    else alert("Incorrect email or password");
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={handleLogin}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input name="email" type="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" id="password" />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
