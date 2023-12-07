describe("Login to testProject", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });
});

it("Login MultiDomain and verify username", () => {
  cy.visit("http://localhost:5173/login");
  cy.contains("Google").click();

  //   cy.origin("https:www.github.com"),
  //     () => {
  //       cy.get("#login").type("wlbrwang@bu.edu");
  //       cy.get("#password").type("yiboWangg5");
  //       cy.get('[data-signin-label="Sign in"]').click();
  //     };
});

// cy.get("user").should("contain", Wilbur);
