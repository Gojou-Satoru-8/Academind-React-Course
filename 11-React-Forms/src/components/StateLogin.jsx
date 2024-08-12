import { useState } from "react";
import Input from "./Input";
import * as validator from "../util/validation";

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [didEdit, setDidEdit] = useState({ email: false, password: false });
  console.log(values);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  const handleChangeInValues = (e) => {
    setValues((prevValues) => ({ ...prevValues, [e.target.name]: e.target.value }));
    setDidEdit((prevValues) => ({ ...prevValues, [e.target.name]: false }));
  };
  const handleInputChange = (e) => {
    setDidEdit((prevValues) => ({ ...prevValues, [e.target.name]: true }));
  };

  // Performing Validation on Stateful values:
  const emailIsInvalid = didEdit.email && !validator.isEmail(values.email) && !validator.isNotEmpty(values.email);
  const passwordIsInvalid = didEdit.password && !validator.hasMinLength(values.password, 8);
  console.log({ emailIsInvalid, passwordIsInvalid });

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          value={values.email}
          onBlur={handleInputChange}
          onChange={handleChangeInValues}
          error={emailIsInvalid && "Please enter a valid email"}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          value={values.password}
          onBlur={handleInputChange}
          onChange={handleChangeInValues}
          error={passwordIsInvalid && "Password length must be between 8 and 20"}
        />
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat" onClick={handleSubmit}>
          Reset
        </button>
        <button type="submit" className="button">
          Login
        </button>
      </p>
    </form>
  );
}
