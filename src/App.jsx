import UserForm from "./components/UserForm";
import ExpenseForm from "./components/ExpenseForm";
import BalanceSheet from "./components/BalanceSheet";
import { Card } from "react-bootstrap";

const App = () => {
  return (
    <>
      <header className="text-center">
        <h1>Expense Sharing Application</h1>
      </header>
      <div className="container mt-4">
        <div className="row">
          <div className="col-8">
            <Card className="shadow bg-white rounded border-0">
              <Card.Body>
                <UserForm />
              </Card.Body>
            </Card>
          </div>
          <div className="col-4">
            <Card className="shadow bg-white rounded border-0">
              <Card.Body>
                <ExpenseForm />
              </Card.Body>
            </Card>
          </div>
        </div>
        <Card className="shadow bg-white rounded border-0 mt-4">
          <Card.Body>
            <BalanceSheet />
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default App;
