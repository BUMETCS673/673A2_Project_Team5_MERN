describe('Test for homepage delete function.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/home');
  });

  it('Click Delete button and remove document card', () => {
    //get card length
    cy.get('.general-card').then((cards) => {
      const initialCardCount = cards.length;

      //delete first card
      cy.get('.general-card').first().as('firstCard');

      //make sure the card you want test exist
      cy.get('@firstCard').should('exist');

      //click delete button
      cy.get('@firstCard').find('.delete').click();

      //click Delete button in modal
      cy.get('@firstCard').find('.delete_confirm').click();

      //validate whether delete
      cy.get('.general-card').should('have.length.lessThan', initialCardCount);
    });
  });
});
