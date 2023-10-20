import { useState } from "react";
import "./BankComponent.css";

const BankComponent = () => {
  const [balance, setBalance] = useState(0);
  const [transactionAmount, setTransactionAmount] = useState();
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [placeholderText, setPlaceholderText] = useState("Betrag in Euro");

  const handleDeposit = () => {
    const amount = parseFloat(transactionAmount);
    if (!isNaN(amount)) {
      const roundedAmount = parseFloat(amount.toFixed(2));
      const newBalance = parseFloat((balance + roundedAmount).toFixed(2));
      setBalance(newBalance);
      setTransactionAmount(placeholderText);
      setTransactionHistory([
        ...transactionHistory,
        { type: "Einzahlung", amount: roundedAmount },
      ]);
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(transactionAmount);
    if (!isNaN(amount) && balance >= amount) {
      const roundedAmount = parseFloat(amount.toFixed(2));
      const newBalance = parseFloat((balance - roundedAmount).toFixed(2));
      setBalance(newBalance);
      setTransactionAmount(placeholderText);
      setTransactionHistory([
        ...transactionHistory,
        { type: "Auszahlung", amount: roundedAmount },
      ]);
    } else {
      alert("Der Kontostand ist leider zu gering :(");
    }
  };

  return (
    <section className="bankComponent">
      <h1>Bank of React</h1>
      <p>Kontostand:{balance}€</p>
      <input
        className="amountInput"
        type="number"
        value={transactionAmount}
        onChange={(e) => setTransactionAmount(e.target.value)}
        placeholder={placeholderText}
      />
      <div className="buttonContainer">
        <button className="deposit" onClick={handleDeposit}>
          Einzahlen
        </button>
        <button className="withdraw" onClick={handleWithdraw}>
          Auszahlen
        </button>
      </div>
      <div className="transactionHistory">
        <h2>Transaktionsverlauf</h2>
        <ul>
          {transactionHistory.map((transaction, index) => (
            <li key={index} className={transaction.type.toLowerCase()}>
              {transaction.type}: {transaction.amount} €
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BankComponent;
