import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    //user from local storage?
    //set user state with user from local storage
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    //call the function login with username, password
    //save the returned data
    //clear the inputs
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.error(exception);
    }
  };

  const handleLogout = () => {
    //
    setUser(null);
    window.localStorage.removeItem("loggedInUser");
  };

  const loginForm = () => (
    <>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username{" "}
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

  const createNewBlog = async (e) => {
    e.preventDefault();
    //post with data
    try {
      blogService.setToken(user.token);
      const blog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(blog));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      console.log(exception.response.data.error);
    }
  };

  const showBlogs = () => (
    <>
      <h1>Blogs</h1>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
      <h3>create new blog</h3>
      <form onSubmit={createNewBlog}>
        <div>
          title:{" "}
          <input
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );

  return <div>{user === null ? loginForm() : showBlogs()}</div>;
};

export default App;
