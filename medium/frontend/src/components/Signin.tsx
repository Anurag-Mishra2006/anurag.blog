import { useContext, useState } from 'react';
import { type SigninInput, signinInput } from "@morpheus.live/medium-common"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.context';
import { jwtDecode } from "jwt-decode";

type MyToken = {
  userId: string;
};

function Signin() {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async () => {
    const body: SigninInput = {
      useremail,
      username,
      password
    }

    const response = signinInput.safeParse(body);

    if (!response.success) {
      alert("Invalid Input");
      return;
    }
    try {
      const user = await axios.post("https://medium.formal-syntax.workers.dev/api/v1/user/signin", body);

      const token = user.data.token;
      const decodedToken = jwtDecode(token) as MyToken;
      localStorage.setItem("token", token);
      // console.log(decodedToken);

      // set user AFTER LOGIN success
      setUser({
        username: username,
        userId: decodedToken?.userId,
      });

      navigate("/");

    } catch (error) {
      console.log(error);
      alert("Signin Failed");
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12">

      <div className="w-full max-w-sm space-y-6">

        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in
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
            placeholder="atleast 6 characters"
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
        <p>Don't  have account <Link className='text-blue-500' to="/signup">Click Here</Link></p>
      </div>
    </div>
  )
}

export default Signin