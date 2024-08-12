import Header from "./components/Header.jsx";
// import Login from "./components/Login.jsx";
import Login from "./components/StateLogin.jsx";
import Signup from "./components/Singup.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* <Signup /> */}
        <Login />
      </main>
    </>
  );
}

export default App;
