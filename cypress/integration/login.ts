describe('My First Test', () => {
  it('Visits login page', () => {
    cy.visit('/login');
    cy.get('[data-test="email"]').type('isjhar@gmail.com');
    cy.get('[data-test="password"').type(`muhtarudinB102!{enter}`);
    cy.url().should('include', '/');
    cy.getCookie('laravel_session').should('exist');
  });
});
