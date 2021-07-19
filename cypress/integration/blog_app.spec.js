describe("Blog app", function () {
  //
  beforeEach(function () {
    //empty the database
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "starryNight",
      username: "starryNight",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("username");
  });

  describe("while logging in", function () {
    it("user can log in", function () {
      //get the input
      //fill in input
      cy.get("#username").type("starryNight");
      cy.get("#password").type("password");
      //click button
      cy.get("#login-button").click();

      //notification about success login shown
      cy.contains("starryNight logged in");
    });
    it("user cannot log in with wrong password", function () {
      //get the input
      //fill in input
      cy.get("#username").type("starryNight");
      cy.get("#password").type("wrong");
      //click button
      cy.get("#login-button").click();

      //notification about success login shown
      cy.get(".errorMessage")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      // log in user
      cy.login({ username: "starryNight", password: "password" });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("E2E with cypress seems ok");
      cy.get("#author").type("cypress");
      cy.get("#url").type("www.cypress.com");
      cy.get("#createBlog-button").click();
      cy.contains("E2E with cypress seems ok");
    });
    describe("after a blog is created", function () {
      //
      beforeEach(function () {
        //
        cy.createBlog({
          title: "Do you wanna give like?",
          author: "Likeme",
          url: "like.com",
        });
      });

      it("user can like a blog", function () {
        //find view, click
        cy.get("#toggleDetails-button").click();
        cy.get("#like-button").click();
        cy.get(".details").should("contain", "1");
      });
    });
  });
});
