describe('Pengguna', () => {
  before(() => {
    cy.login().visit('/setting');
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('laravel_session', 'XSRF-TOKEN');
  });

  it('Insert User', () => {
    cy.get('[data-test="btn-add-list"]').click();
    cy.get('[data-test="email"]').type('test@gmail.com');
    cy.get('[data-test="name"]').type('test');
    cy.get('[data-test="password"]').type('test123');
    cy.get('[data-test="confirm-password"]').type('test123');
    cy.get('[data-test="roles"]')
      .click()
      .get('mat-option')
      .contains('Admin')
      .click();

    cy.get('body').click();

    cy.intercept({
      url: '/api/users',
      method: 'POST',
    }).as('storeUser');

    cy.get('[data-test="btn-add-form"]').click();

    cy.wait('@storeUser').then((interception) => {
      cy.get('[data-test="error"]').should('not.exist');
    });
  });

  it('Delete User', () => {
    cy.get('[data-test="btn-delete"]').last().click();

    cy.intercept({
      url: '/api/users/*',
      method: 'DELETE',
    }).as('deleteUser');

    cy.get('[data-test="btn-yes"]').click();

    cy.wait('@deleteUser').then((interception) => {
      cy.get('[data-test="error"]').should('not.exist');
    });
  });
});
