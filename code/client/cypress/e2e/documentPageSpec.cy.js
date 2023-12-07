describe("Document Page", () => {
  it("successfully load", () => {
    cy.visit("/");

    // Get an input, type into it
    cy.get(".texteditor").type("bubble sort");

    //  Verify that the value has been updated
    cy.get(".texteditor").should("have.value", "bubble sort");

    cy.contains("save").click().should(contains("saved"));

    //  Verify that the value has been updated
    cy.get(".texteditor").should("have.value", "bubble sort");

    cy.contains("generate").click().should(contains("generate"));

    cy.contains("generate").click().should(contains("generate"));

    cy.contains("Back").click();

    cy.url().should("include", "/home");
  });
});
