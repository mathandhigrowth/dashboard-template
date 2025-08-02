import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="p-6 max-w-sm mx-auto mt-20 border rounded-lg shadow-lg bg-white">
      <h1 className="text-xl font-semibold mb-4 text-center">Admin Login</h1>
      <form className="space-y-4">
        <input name="email" type="email" placeholder="Email" required className="w-full p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" required className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition">
          Login{" "}
        </button>
        <button type="button" className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 transition">
          Login with Google
        </button>
      </form>
      <button className="text-center w-full block mt-2 font-bold">
        <Link to="/dashboard">Go to dashboard</Link>
      </button>
    </div>
  );
};

export default LoginPage;
