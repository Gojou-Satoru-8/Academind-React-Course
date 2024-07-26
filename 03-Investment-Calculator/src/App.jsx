import { useState } from "react";
import UserInput from "./Components/UserInput";
import Results from "./Components/Results";
import { calculateInvestmentResults } from "./util/investment";

function App() {
  const [parameters, setParameters] = useState({
    initialInvestment: "",
    annualInvestment: "",
    expectedReturn: "",
    duration: "",
  });

  const handleInputChange = function (e) {
    setParameters((currentParameters) => {
      // const newParameters = structuredClone(currentParameters);
      // const changedParameter = e.target.name;
      // const changedParameterValue = e.target.value;
      // return { ...newParameters, [changedParameter]: changedParameterValue };
      console.log(e.target.name, e.target.value);

      return { ...currentParameters, [e.target.name]: Number(e.target.value) };
    });
  };
  console.log(parameters);

  const inputs = Object.entries(parameters);
  const isInputValid = parameters.duration > 0;
  // If all inputs are set, and input is valid, then calculate annualData:
  let annualData = [];
  if (isInputValid && inputs.every((item) => item[1] !== ""))
    annualData = calculateInvestmentResults({ ...parameters });

  return (
    <>
      <UserInput values={parameters} onInputChange={handleInputChange} />
      {!isInputValid && <p className="center">Please enter a duration greater than 0</p>}
      {annualData.length !== 0 && <Results tableData={annualData} />}
    </>
  );
}

export default App;
