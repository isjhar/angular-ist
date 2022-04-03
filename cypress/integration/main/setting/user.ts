describe('User', () => {
  before(() => {
    cy.login().visit('/setting/users');
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('laravel_session', 'XSRF-TOKEN');
  });

  it('Insert user', () => {
    cy.get('[data-test="btn-add-list"]').click();
    cy.get('[data-test="email"]').type('ztest@gmail.com');
    cy.get('[data-test="name"]').type('ztest');
    cy.get('[data-test="password"]').type('ztest123');
    cy.get('[data-test="confirm-password"]').type('ztest123');
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

    cy.get('[data-test="btn-save-form"]').click();

    cy.wait('@storeUser').then((interception) => {
      cy.get('[data-test="error"]').should('not.exist');
    });
  });

  it('Insert duplicate user email', () => {
    cy.get('[data-test="btn-add-list"]').click();
    cy.get('[data-test="email"]').type('ztest@gmail.com');
    cy.get('[data-test="name"]').type('ztest');
    cy.get('[data-test="password"]').type('ztest123');
    cy.get('[data-test="confirm-password"]').type('ztest123');
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

    cy.get('[data-test="btn-save-form"]').click();

    cy.wait('@storeUser').then((interception) => {
      cy.get('[data-test="error"]').should('exist');
      cy.get('[data-test="btn-cancel-form"]').click();
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
