describe("Blog app", function () {
  //
  beforeEach(function () {
    //empty the database
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("username");
  });

  describe("when logging in", function () {
    beforeEach(function () {
      const user = {
        name: "starryNight",
        username: "starryNight",
        password: "password",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
    });

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
    it("user cannot log in with wrong credentials", function () {
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
});
