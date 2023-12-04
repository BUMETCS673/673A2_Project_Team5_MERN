describe('Test for homepage card double click.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/home');
  });

  it('Double click card and navigated to document page', () => {
    //find document card and do double click.
    cy.get('.doc-container').dblclick();

    //validate whether nav to document page, validate url include /document/
    cy.url().should('include', '/document/');
  });
});
