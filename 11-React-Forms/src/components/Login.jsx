import { useRef, useState } from "react";

export default function Login() {
  const formRef = useRef();
  const [emailIsInvalid, setEmailisInvalid] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const formData = new FormData(formRef.current);
    // const formData = new FormData(e.target); // Thus, ref is not required
    console.log(Object.fromEntries(formData)); // With our w/o entries, both work
    // console.log(Object.fromEntries(formData.entries()));
    const emailIsValid = formData.get("email").includes("@") && formData.get("email").includes(".");
    // setEmailisInvalid(!emailIsValid);
    if (!emailIsValid) {
      setEmailisInvalid(true);
      return;
    }

    // Else case (Proceed to sending HTTP request):
    setEmailisInvalid(false);
    console.log("Sending HTTP Request");
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
          <div className="control-error">{emailIsInvalid && <p>Please enter a valid email address</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
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
