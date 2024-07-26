import { useState } from "react";
import Section from "./Section";
import Tabs from "./Tabs";
import TabButton from "./TabButton";
import { EXAMPLES as examples } from "../data";

const Examples = function () {
  // let selectedTopic = "Please click a button";
  // NOTE: Merely declaring and updating a variable (selectedTopic in this case) via the handleSelect function,
  // doesn't mean react will re-execute this App Component function, and re-render the component...
  // Here despite reassigning this variable on every button click, it doesn't update the UI, as the variable
  // selectedTopic wasn't declared as a state variable.
  // To re-execute this Component function, we need to declare this using a hook:

  console.log("EXAMPLES COMPONENT EXECUTING (pre click-handler)");

  const [selectedTopic, setSelectedTopic] = useState();
  // NOTE: useState variables can be declared with const, even though they are supposed to be reassigned

  const handleSelect = function (selectedButton) {
    // console.log("Hello world - a tab button was clicked");
    // selectedTopic = ;
    // console.log(selectedTopic);

    setSelectedTopic(selectedButton);
    console.log(selectedTopic);
    // NOTE: printing the selectedTopic right after updating it, still gives us the old value, this is because
    // the new value is set right after the execution of handleSelect function, and now that react detects that
    // the value of a state variable is changed, it re-renders the component (Examples in this case).
    // It can clearly be understood from the console.log("EXAMPLES COMPONENT EXECUTING....") statements
  };

  console.log("EXAMPLES COMPONENT EXECUTING (post click-handler)");

  const tabContent = !selectedTopic ? (
    <p>Please select a topic</p>
  ) : (
    <div id="tab-content">
      <h3>{examples[selectedTopic]?.title}</h3>
      <p>{examples[selectedTopic]?.description}</p>
      <pre>{examples[selectedTopic]?.code}</pre>
    </div>
  );

  return (
    <Section id="examples" title="Examples">
      <Tabs content={tabContent} wrapperElement="menu">
        {/* NOTE: Built-in HTML elements are passed as strings, whereas Custom Components are passed this way: <Tabs content={tabContent} wrapperElement={Section}> */}
        <TabButton isSelected={selectedTopic === "components"} onSelect={() => handleSelect("components")}>
          Components
        </TabButton>
        <TabButton isSelected={selectedTopic === "jsx"} onSelect={() => handleSelect("jsx")}>
          JSX
        </TabButton>
        <TabButton isSelected={selectedTopic === "props"} onSelect={() => handleSelect("props")}>
          Props
        </TabButton>
        <TabButton isSelected={selectedTopic === "state"} onSelect={() => handleSelect("state")}>
          State
        </TabButton>
      </Tabs>
    </Section>
  );
};

export default Examples;
