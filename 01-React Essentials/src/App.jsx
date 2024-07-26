import Header from "./components/Header";
import CoreConcepts from "./components/CoreConcepts";
import Examples from "./components/Examples";
// NOTE: Can name the default export anything, it should start with an uppercase letter.
// By convention, we name the components, the associated function and the imported variable the same.

function App() {
  return (
    <div>
      {/* <Header></Header> */}
      <Header />
      <main>
        <CoreConcepts />

        <h2>Time to get started!</h2>
        <Examples />
      </main>
    </div>
  );
}
// NOTE: As component functions must return one element ie if there are multiple elements/components, they must
// be enclosed within a single parent, we usually choose <div> elements for wrapping them up, but this creates
// unnecessary divs, that might affect the hierarchy and also styling. So there are two alternatives:
// (1) import { Fragment } from "react"; and then wrap the returned jsx inside <Fragment> ... </Fragment>
// Or in modern react projects, just wrap the JSX inside <> ... </>
export default App;
