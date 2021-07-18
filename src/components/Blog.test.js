import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

describe("<Blog/>", () => {
  let component;

  beforeEach(() => {
    const blog = {
      title: "Testing on Frontend",
      author: "Guru of Tests",
      url: "https://somewhere.com",
      likes: 99,
      user: {
        name: "The Other One",
      },
    };

    const user = {
      name: "Somebody",
      username: "smb",
    };

    const showNotification = jest.fn();
    const setBlogs = jest.fn();
    const blogs = [];

    component = render(
      <Blog
        blog={blog}
        user={user}
        showNotification={showNotification}
        setBlogs={setBlogs}
        blogs={blogs}
      />
    );
  });

  test("by default displays author&title; url&likes are hidden", () => {
    expect(component.container).toHaveTextContent(
      "Testing on Frontend",
      "Guru of Tests"
    );
    const div = component.container.querySelector(".details");
    expect(div).toHaveStyle("display: none");
  });

  test("when button view is clicked, likes and url are displayed", () => {
    const button = component.getByText("view");
    fireEvent.click(button);
    component.debug();
    const div = component.container.querySelector(".details");
    expect(div).not.toHaveStyle("display: none");
  });
});
