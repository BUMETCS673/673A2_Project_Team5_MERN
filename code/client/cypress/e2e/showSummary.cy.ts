describe('Test for homepage show summary button.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/home');
  });

  it('Click show summary button and should show summary modal', () => {
    //click "show summary" button
    cy.get('.big-button-summary').click();

    //check whether modal show correctly
    cy.get('.summary-modal').should('be.visible');
  });
});
