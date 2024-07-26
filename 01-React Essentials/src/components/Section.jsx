export default function Section({ title, children, ...restProps }) {
  // Here, restProps are only meant for attributes of section element (like id, className etc)
  return (
    <section {...restProps}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
