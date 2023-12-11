describe('Test for homepage create doc function to "enter" keyboard press.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/home');
  });

  it('Press "Enter" keyboard in modal and navigated to document page ', () => {
    const documentTitle = 'Test for Cypress Enter';

    //click "+ Create New" button to open create new document modal
    cy.get('.big-button').click();

    //input doc title and press enter
    cy.get('.title-input').type(`${documentTitle}{enter}`);

    //validate whether nav to document page, validate url include /document/
    cy.url().should('include', '/document/');

    //validate title///////////////////////////////////////??????????????????????
    cy.get('.doc-title').should('have.text', documentTitle);
  });
});
