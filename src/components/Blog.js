import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, setBlogs, blogs, showNotification, user }) => {
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

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(`Are you sure to delete ${blog.title}?`);
      if (!confirmed) return;
      blogService.setToken(user.token);
      await blogService.remove(blog.id);
      showNotification(`${blog.title} was removed.`);
      setBlogs(blogs.filter((e) => (e.id !== blog.id ? e : "")));
    } catch (exception) {
      showNotification(exception.response.data.error, "errorMessage");
    }
  };
  //blog.user.id = user.id
  const showDeleteButton = () => (
    <button onClick={handleDelete}>delete blog</button>
  );

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
        <br />
        {blog.user.username === user.username ? showDeleteButton() : ""}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  showNotification: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
