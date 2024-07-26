export default function Tabs({ children, content, wrapperElement }) {
  const WrapperElement = wrapperElement ?? "menu";
  // This is the identifier for the type of HTML element/custom component that will be wrapping the
  // children elements. For built-in HTML elements, pass them as strings, ie wrapperElement="menu".
  // For custom components like Section, use wrapperElement={Section}.
  // Furthermore, this can be simplified by setting the prop name to WrapperElement so the need for the first
  // line will be eliminated, ie they should always be capitalized.
  return (
    <>
      <WrapperElement>{children}</WrapperElement>
      {content}
    </>
  );
}
