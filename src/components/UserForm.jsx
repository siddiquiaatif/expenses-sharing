import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";
import { Button, Form } from "react-bootstrap";

const UserForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleAddUser = () => {
    dispatch(addUser({ name, email, mobile }));
    setName("");
    setEmail("");
    setMobile("");
  };

  return (
    <div>
      <h2>Add User</h2>
      <Form className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleAddUser}>Add User</Button>
      </Form>{" "}
    </div>
  );
};

export default UserForm;
