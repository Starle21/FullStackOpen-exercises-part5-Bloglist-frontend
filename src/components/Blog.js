import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const hiddenDefault = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
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
        likes {blog.likes} <button>like</button>
        <br />
        {blog.user.name}
      </div>
    </div>
  );
};

export default Blog;
