import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../slices/expenseSlice";
import { Button, Form } from "react-bootstrap";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [payer, setPayer] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [splitType, setSplitType] = useState("EQUAL");
  const [exactAmounts, setExactAmounts] = useState({});
  const [percentages, setPercentages] = useState({});

  const handleExactAmountChange = (userName, amount) => {
    setExactAmounts((prevAmounts) => ({
      ...prevAmounts,
      [userName]: parseFloat(amount) || 0,
    }));
  };

  const handlePercentageChange = (userName, percentage) => {
    setPercentages((prevPercentages) => ({
      ...prevPercentages,
      [userName]: parseFloat(percentage) || 0,
    }));
  };
  useEffect(() => {
    setPayer(users.length > 0 ? users[0].name : "");
    setSelectedUsers(users.map((user) => user.name));
  }, [users]);

  const handleAddExpense = () => {
    const expense = {
      payer,
      amount: parseFloat(amount),
      users: selectedUsers,
      splitType,
      exactAmounts,
      percentages,
    };

    dispatch(addExpense(expense));
    setAmount("");
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Select Payer</Form.Label>
        <Form.Select value={payer} onChange={(e) => setPayer(e.target.value)}>
          <option>select payer</option>
          {users.map((user) => (
            <option key={user.name} value={user.name}>
              {user.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Select Payer</Form.Label>
        <Form.Select
          value={splitType}
          onChange={(e) => setSplitType(e.target.value)}
        >
          <option value="EQUAL">Equal</option>
          <option value="EXACT">Exact</option>
          <option value="PERCENT">PERCENT</option>
        </Form.Select>
      </Form.Group>
      {splitType === "EXACT" && (
        <div>
          <label>Exact Amounts:</label>
          {users.map((user) => (
            <div key={user.name}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>{user.name}</Form.Label>
                <Form.Control
                  type="number"
                  value={exactAmounts[user.name] || ""}
                  onChange={(e) =>
                    handleExactAmountChange(user.name, e.target.value)
                  }
                />
              </Form.Group>
            </div>
          ))}
        </div>
      )}
      {splitType === "PERCENT" && (
        <div>
          <label>Percentages:</label>
          {users.map((user) => (
            <div key={user.name}>
              <label>{user.name}:</label>
              <input
                type="number"
                value={percentages[user.name] || ""}
                onChange={(e) =>
                  handlePercentageChange(user.name, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      )}
      <div className="my-3">
        <label>Select Users:</label>
        <br />
        {users.length > 0
          ? users.map((user) => (
              <>
                <Form.Check
                  type="checkbox"
                  label={user.name}
                  value={user.name}
                  checked={selectedUsers.includes(user.name)}
                  onChange={() => {
                    const updatedUsers = selectedUsers.includes(user.name)
                      ? selectedUsers.filter((name) => name !== user.name)
                      : [...selectedUsers, user.name];
                    setSelectedUsers(updatedUsers);
                  }}
                />
              </>
            ))
          : "User Not Found"}
      </div>
      <Button onClick={handleAddExpense}>Add Expense</Button>
    </div>
  );
};

export default ExpenseForm;
