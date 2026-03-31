import   { useContext } from "react";
import { UserContext } from "../context/User.context";
import { Link } from "react-router-dom";

interface HeaderProp {
  id: string;
  onPublish?: () => void;
  blogId?: string;
}

function Header({ id, onPublish, blogId }: HeaderProp) {
  const { user, setUser } = useContext(UserContext);

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("token");
  }


  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">

      {/* Logo */}
      <div className="text-xl font-bold text-gray-800">
        <Link to="/">MyBlog</Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {user ? (
          <>
            {/* create blog */}
            {id == "create-blog" && <div className="text-gray-700 font-bold">
              <Link to="/blogs">Create Blog</Link>
            </div>}

            {id == "publish" && <div id="create-blog" className="text-green-700 font-bold">
              <button onClick={onPublish} type="button">Publish</button>
            </div>}
            {id === "edit" && <Link to={`/blog/${blogId}/edit`} >
                <button className="text-blue-700 font-bold" type="button">Edit</button>
            </Link>
            }
            <span className="text-gray-700 font-medium">
              Hey {user.username}
            </span>

            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/signin"
            className="px-4 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;