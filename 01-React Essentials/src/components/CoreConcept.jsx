export default function CoreConcept(props) {
  const { image, title, description } = props;

  return (
    <li>
      <img src={image} alt="Some text" />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}

// NOTE: It's not necessary to name a default export, ie you can just export a function expression or an arrow
// function, however as per eslint rules configured they may show a warning:
// export default function (props) {
//   return (
//     <li>
//       <img src={props.image} alt="Some text" />
//       <h3>{props.title}</h3>
//       <p>{props.description}</p>
//     </li>
//   );
// }

// Or this works too:
// export default (props) => {
//   return (
//     <li>
//       <img src={props.image} alt="Some text" />
//       <h3>{props.title}</h3>
//       <p>{props.description}</p>
//     </li>
//   );
// };
