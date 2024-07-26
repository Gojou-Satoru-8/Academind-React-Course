import React from "react";
// import random from "random";
import reactImg from "../assets/react-core-concepts.png";

const reactDescriptions = ["Fundamental", "Crucial", "Core"];
const myInfo = { fName: "Ankush", lName: "Bhowmik", age: 24 };

const genRandomInt = (max) => {
  return Math.floor(Math.random() * max);
  // Here, max is an unreachable value, thus for array length 3, if max = 3 is passed, then values will range
  // from 0 to 2
};

export default function Header() {
  const description = reactDescriptions.at(genRandomInt(reactDescriptions.length)); // Or
  //   const description = random.choice(reactDescriptions);
  // Can use object destructuring for the myInfo h2 line:
  const { fName: name1, lName: name2, age } = myInfo;
  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>{description} React concepts you will need for almost any app you are going to build!</p>
      <h2>
        {/* Hey there, my name is {myInfo.fName} {myInfo.lName} and I'm {myInfo.age} years old */}
        Hey there, my name is {name1} {name2} and I'm {age} years old
      </h2>
    </header>
  );
}
