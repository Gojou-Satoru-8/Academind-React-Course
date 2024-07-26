import Section from "./Section";
import CoreConcept from "./CoreConcept";
import { CORE_CONCEPTS as concepts } from "../data";

const CoreConcepts = function () {
  return (
    <Section id="core-concepts" title="Core Concepts">
      {/* NOTE: The following shows the different ways of passing props: */}
      {/* <ul>
          <CoreConcept image={concepts[0].image} title={concepts[0].title} description={concepts[0].description} />
          <CoreConcept image={concepts[1].image} title={concepts[1].title} description={concepts[1].description} />
          <CoreConcept {...concepts[2]} />
          <CoreConcept {...concepts[3]} />
        </ul> */}
      {/* NOTE: If the custom attributes have the same name-value pairs as the object's properties, then
          it is possible to use the spread operator, as shown above */}
      {/* OR: Using the map method to loop through the concepts object, creating render-able array:
        NOTE: This allows us to use the key attribute, with the value of the index of the item in the array,
        although it is to be noted that array-indices should not be used as keys of React components */}
      {/* <ul>
          {concepts.map((item, index) => (
            <CoreConcept image={item.image} title={item.title} description={item.description} key={index} />
          ))}
        </ul> */}
      {/* Further simplifying it: */}
      <ul>
        {concepts.map((item) => (
          <CoreConcept {...item} key={item.title} />
        ))}
      </ul>
    </Section>
  );
};

export default CoreConcepts;
