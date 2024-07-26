const TabButton = function (props) {
  //   console.log(props); // Props object is empty unless custom attributes are passed or children property is
  // set by passing anything (html element or a string) between the custom components
  const { isSelected, onSelect, children } = props;

  return (
    <li>
      {/* <button onClick={() => console.log("Button clicked")}>{props.children}</button> */}
      <button type="submit" className={isSelected ? "active" : ""} onClick={onSelect}>
        {/* NOTE: Do not write className={isSelected && "active"} as in case of isSelected being false, 
        boolean classNames give warning */}
        {children}
      </button>
    </li>
  );
};

// NOTE: The choice of using props.children is totally optional, because the same result can be achieved by
// using a custom attribute (named as per our will)
export default TabButton;
