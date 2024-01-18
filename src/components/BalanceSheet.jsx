import { useSelector } from "react-redux";

const BalanceSheet = () => {
  const users = useSelector((state) => state.users);
  const expenses = useSelector((state) => state.expenses);

  const calculateBalances = () => {
    const balanceList = [];

    expenses.forEach((expense, index) => {
      const {
        payer,
        users: expenseUsers,
        splitType,
        exactAmounts,
        percentages,
      } = expense;
      const previousBalances = index > 0 ? balanceList[index - 1] : {};

      const balances = { ...previousBalances };

      if (balances[payer]) {
        const remainingBalance = balances[payer];
        balances[payer] = 0;
        Object.keys(balances).forEach((user) => {
          if (user !== payer) {
            balances[user] = (balances[user] || 0) - remainingBalance;
          }
        });
      }

      if (splitType === "EQUAL") {
        const share = expense.amount / expenseUsers.length;
        expenseUsers.forEach((user) => {
          if (user !== payer) {
            balances[user] = (balances[user] || 0) + share;
            balances[payer] = (balances[payer] || 0) - share;
          }
        });
      } else if (splitType === "EXACT") {
        expenseUsers.forEach((user) => {
          if (user !== payer && exactAmounts && exactAmounts[user]) {
            const exactAmount = exactAmounts[user];
            balances[user] = (balances[user] || 0) + exactAmount;
            balances[payer] = (balances[payer] || 0) - exactAmount;
          }
        });
      } else if (splitType === "PERCENT") {
        expenseUsers.forEach((user) => {
          if (user !== payer) {
            const percentageAmount =
              (percentages && (percentages[user] / 100) * expense.amount) || 0;
            balances[user] = (balances[user] || 0) + percentageAmount;
            balances[payer] = (balances[payer] || 0) - percentageAmount;
          }
        });
      }

      delete balances[payer];

      balanceList.push({ ...balances });
    });

    return balanceList;
  };

  const balanceList = calculateBalances();

  return (
    <div>
      <h2>Balance Sheet</h2>
      {balanceList.length > 0
        ? balanceList.map((balances, index) => (
            <div key={index}>
              <h3>Expense {index + 1}</h3>
              <ul>
                {Object.keys(balances).map((userId) => {
                  const payerName =
                    users.find((user) => user.userId === expenses[index].payer)
                      ?.name || `User${expenses[index].payer}`;
                  const userName =
                    users.find((user) => user.userId === userId)?.name ||
                    `User${userId}`;
                  const balanceAmount = balances[userId].toFixed(2);
                  const balanceInfo =
                    balances[userId] >= 0
                      ? `${userName} owes ${payerName}: ${balanceAmount} (+${balanceAmount})`
                      : `${userName} owes ${payerName}: ${balanceAmount} (${balanceAmount})`;

                  return <li key={userId}>{balanceInfo}</li>;
                })}
              </ul>
            </div>
          ))
        : "No Data found"}
    </div>
  );
};

export default BalanceSheet;
