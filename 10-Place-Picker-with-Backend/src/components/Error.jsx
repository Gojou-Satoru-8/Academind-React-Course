const Error = function ({ title, message, onConfirm }) {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div id="confirmation-actions">
          <button type="button" onClick={onConfirm} className="button">
            Okay
          </button>
        </div>
      )}
    </div>
  );
};
export default Error;
