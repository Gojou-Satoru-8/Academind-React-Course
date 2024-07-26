/* eslint-disable jsx-a11y/label-has-associated-control */
const UserInput = function ({ values, onInputChange }) {
  const { initialInvestment, annualInvestment, expectedReturn, duration } = values;

  return (
    <div id="user-input">
      <div className="input-group">
        <label htmlFor="initialInvestment">Initial Investment</label>
        <input
          type="number"
          id="initialInvestment"
          name="initialInvestment"
          value={initialInvestment}
          onChange={onInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="annualInvestment">Annual Investment</label>
        <input
          type="number"
          id="annualInvestment"
          name="annualInvestment"
          value={annualInvestment}
          onChange={onInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="expectedReturn">Expected Return</label>
        <input
          type="number"
          id="expectedReturn"
          name="expectedReturn"
          value={expectedReturn}
          onChange={onInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="duration">Duration</label>
        <input type="number" id="duration" name="duration" value={duration} onChange={onInputChange} />
      </div>
    </div>
  );
};

export default UserInput;
