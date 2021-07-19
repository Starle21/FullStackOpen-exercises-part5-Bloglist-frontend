import React, { useState } from "react";
import PropTypes from "prop-types";

const NewBlog = ({ createNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addNewBlog = (e) => {
    e.preventDefault();

    createNewBlog({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h3>create new blog</h3>
      <form onSubmit={addNewBlog} className="submitNewBlog">
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
    </div>
  );
};

NewBlog.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
};

export default NewBlog;
