describe('Test for sign out', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/home');
  });

  it('should redirect to login page after clicking sign out', () => {
    //click head picture to find "sign out" button
    cy.get('.head1').click();

    //click sign out
    cy.get('.sign-out').click();

    //validate whether nav to login page
    cy.url().should('include', '/login');
  });
});
