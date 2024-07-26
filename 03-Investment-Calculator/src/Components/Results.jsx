import { formatter } from "../util/investment";

const Results = function ({ tableData }) {
  const initialInvestment =
    tableData.at(0).valueEndOfYear - (tableData.at(0).interest + tableData.at(0).annualInvestment);
  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest(Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => {
          const totalInterest = row.valueEndOfYear - row.annualInvestment * row.year - initialInvestment;
          const totalAmountInvested = row.valueEndOfYear - totalInterest;
          return (
            <tr key={row.year}>
              <td>{row.year}</td>
              <td>{formatter.format(row.valueEndOfYear)}</td>
              <td>{formatter.format(row.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Results;
