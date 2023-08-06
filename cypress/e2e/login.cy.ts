describe('Auth', () => {
  it('Login failed', () => {
    cy.visit('/login');
    cy.get('[data-test="email"]').type('janedoe@gmail.com');
    cy.get('[data-test="password"').type(`1234{enter}`);
    cy.get('[data-test="error"').should('exist');
  });

  it('Login success', () => {
    cy.visit('/login');
    cy.get('[data-test="email"]').clear().type('sysadmin@gmail.com');
    cy.get('[data-test="password"').clear().type(`1234{enter}`);
    cy.url().should('include', '/');
    cy.getCookie('laravel_session').should('exist');
  });

  it('Logout', () => {
    cy.login('sysadmin@gmail.com', '1234').visit('/');

    cy.get('[data-test="btn-profile"]').click();
    cy.get('[data-test="btn-logout"').should('exist');
    cy.get('[data-test="btn-logout"').click();
    cy.url().should('include', '/login');
  });
});
