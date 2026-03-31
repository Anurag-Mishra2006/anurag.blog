import { useState } from 'react';
import {signupInput, type SignupInput } from "@morpheus.live/medium-common"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const body: SignupInput = {
      useremail,
      username,
      password
    }

    const response = signupInput.safeParse(body);

    if (!response.success) {
      alert("Invalid Input");
      return;
    }

    try {
      const user = await axios.post("https://medium.formal-syntax.workers.dev/api/v1/user/signup", body);
      // console.log(user.data);
      const token = user.data.token;
      localStorage.setItem("token", token);

      navigate("/blogs");

    } catch (error) {
      console.log(error);
      alert("User already exists");
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12">

      <div className="w-full max-w-sm space-y-6">

        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign Up
        </h2>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>

          <input
            id="username"
            type="text"
            placeholder="John Doe"
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="useremail" className="block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            id="useremail"
            type="email"
            placeholder="example@gmail.com"
            onChange={(e) => setUseremail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="abc123"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 transition"
        >
          Submit
        </button>
      </div>
      <div>
        <p>Already  have account <Link className='text-blue-500' to="/signin">Click Here</Link></p>
      </div>
    </div>
  )
}

export default Signup