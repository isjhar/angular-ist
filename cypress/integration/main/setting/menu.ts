describe('Menu', () => {
  before(() => {
    cy.login().visit('/setting/menus');
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('laravel_session', 'XSRF-TOKEN');
  });

  it('Insert menu', () => {
    cy.get('[data-test="btn-add-menu-list"]').click();
    cy.get('[data-test="name"]').type('Registration');
    cy.get('[data-test="url"]').type('/registration');

    cy.intercept({
      url: '/api/menus',
      method: 'POST',
    }).as('storeMenu');

    cy.get('[data-test="btn-save-form"]').click();

    cy.wait('@storeMenu').then((interception) => {
      cy.get('[data-test="error"]').should('not.exist');
    });
  });

  it('Insert duplicate menu', () => {
    cy.get('[data-test="btn-add-menu-list"]').click();
    cy.get('[data-test="name"]').type('Registration');
    cy.get('[data-test="url"]').type('/registration');

    cy.intercept({
      url: '/api/menus',
      method: 'POST',
    }).as('storeMenu');

    cy.get('[data-test="btn-save-form"]').click();

    cy.wait('@storeMenu').then((interception) => {
      cy.get('[data-test="error"]').should('exist');
      cy.get('[data-test="btn-cancel-form"]').click();
    });
  });

  it('Edit menu', () => {
    cy.get('[data-test="btn-edit"]').last().click();
    cy.get('[data-test="name"]').clear();
    cy.get('[data-test="name"]').type('Registration');

    cy.intercept({
      url: '/api/menus/*',
      method: 'PATCH',
    }).as('updateMenu');

    cy.get('[data-test="btn-save-form"]').click();

    cy.wait('@updateMenu').then((interception) => {
      cy.get('[data-test="error"]').should('not.exist');
    });
  });

  it('Delete Menu', () => {
    cy.get('[data-test="btn-delete"]').last().click();

    cy.intercept({
      url: '/api/menus/*',
      method: 'DELETE',
    }).as('deleteMenu');

    cy.get('[data-test="btn-yes"]').click();

    cy.wait('@deleteMenu').then((interception) => {
      cy.get('[data-test="error"]').should('not.exist');
    });
  });
});
