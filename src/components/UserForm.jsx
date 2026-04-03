import { useState, useEffect } from "react";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState();
  const [description, setDescription] = useState()

  const fetchUsers = async () => {
    const res = await axios.get(`${VITE_API_URL}/api/users`);
    setUsers(res.data);
  };

  const updateUser = async (id) => {
    try {
      const res = await axios.put(`${VITE_API_URL}/api/update/`, id)
    } catch (error) {
      console.log(error)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      role: role,
      description: description
    }
    await axios.post(`${VITE_API_URL}/api/users/add`, data);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={submitHandler}>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Role" onChange={(e) => setRole(e.target.value)} />
        <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />

        <button type="submit">Submit</button>
      </form>

      <h2>Users List</h2>
      {users?.map((u) => {
        return (
          <div className="">
            <p key={u?._id}>{u?.name} - {u?.email} - {u?.role} - {u?.description}</p>
            <button onClick={() => updateUser(u?._id ?? "69cfa2bff11341f9ba5778aa")}>update user</button>
          </div>
        )
      })}
    </div>
  );
}

export default UserForm;