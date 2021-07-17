import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, blogs }) => {
  const [visible, setVisible] = useState(false);
  const hiddenDefault = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const handleIncreaseLikes = async () => {
    const copyBlog = { ...blog, likes: blog.likes + 1 };
    const blogUpdated = await blogService.update(blog.id, copyBlog);
    setBlogs(blogs.map((e) => (e.id !== blogUpdated.id ? e : blogUpdated)));
  };

  return (
    <div className="blog">
      {/* when details hidden */}
      {blog.title} {blog.author}{" "}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      {/*  when details visible*/}
      <div style={hiddenDefault}>
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={handleIncreaseLikes}>like</button>
        <br />
        {blog.user.name}
      </div>
    </div>
  );
};

export default Blog;
