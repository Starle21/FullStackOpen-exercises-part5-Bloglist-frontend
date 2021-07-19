import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, user, giveLike, deletePost }) => {
  const [visible, setVisible] = useState(false);
  const hiddenDefault = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const showDeleteButton = () => (
    <button onClick={deletePost}>delete blog</button>
  );

  return (
    <div className="blog">
      {/* when details hidden */}
      {blog.title} {blog.author}{" "}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      {/*  when details visible*/}
      <div style={hiddenDefault} className="details">
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={giveLike}>like</button>
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
  giveLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
