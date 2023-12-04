describe('Test for homepage create doc function to mouse click.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/home');
  });

  it('Click Create button in modal and navigated to document page and validate title match ', () => {
    const documentTitle = 'Test for Cypress';
    //click "+ Create New" button to open create new document modal
    cy.get('.big-button').click();

    //input doc title
    cy.get('.title-input').type(documentTitle);

    //click "+Create New" button in modal
    cy.get('.big-button-modal').click();

    //validate whether nav to document page, validate url include /document/
    cy.url().should('include', '/document/');

    //validate title
    cy.get('.doc-title').should('have.text', documentTitle);
  });
});
