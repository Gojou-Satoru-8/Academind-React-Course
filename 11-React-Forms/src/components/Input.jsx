const Input = function ({ label, id, error, ...restProps }) {
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...restProps} />
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
};

export default Input;
