import { useState, useRef } from "react";

export default function Player() {
  // const [name, setName] = useState("");
  const name = useRef();
  const [nameElement, setNameElement] = useState("");
  // console.log(name, name.current);
  const handleButtonClick = function () {
    setNameElement(name.current.value);
    name.current.value = "";
  };
  return (
    <section id="player">
      <h2>Welcome {nameElement || "unknown entity"}</h2>
      <p>
        {/* <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={() => setNameElement(name)}>Set Name</button> */}
        <input type="text" ref={name} />
        <button type="button" onClick={handleButtonClick}>
          Set Name
        </button>
      </p>
    </section>
  );
}
