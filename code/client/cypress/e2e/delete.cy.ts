describe('Test for homepage delete function.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/home');
  });

  it('Click Delete button and remove document card', () => {
    //ididi
    const documentCardSelector = '';

    //make sure the card you want test exist
    cy.get(documentCardSelector).should('exist');

    //click delete button
    cy.get('.delete').click();

    //click Delete button in modal
    cy.get('.delete_confirm').click();

    //validate whether delete
    cy.get(documentCardSelector).should('not.exist');
  });
});
