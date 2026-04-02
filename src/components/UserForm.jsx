import React, { useState, useEffect } from "react";
import axios from "axios";

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/users/add", {
      name,
      email,
    });
    fetchUsers();
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={submitHandler}>
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Users List</h2>
      {users.map((u) => (
        <p key={u._id}>{u.name} - {u.email}</p>
      ))}
    </div>
  );
}

export default UserForm;