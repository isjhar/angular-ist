describe('Role', () => {
  before(() => {
    cy.login().visit('/setting/roles');
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('laravel_session', 'XSRF-TOKEN');
  });

  it('Insert role', () => {
    cy.get('[data-test="btn-add-role-list"]').click();
    cy.get('[data-test="name"]').type('Perawat');
    cy.get('[data-test="menus"]')
      .click()
      .get('mat-option')
      .contains('Setting')
      .click();

    cy.get('body').click();

    cy.intercept({
      url: '/api/roles',
      method: 'POST',
    }).as('storeRole');

    cy.get('[data-test="btn-save-form"]').click();

    cy.wait('@storeRole').then((interception) => {
      cy.get('[data-test="error"]').should('not.exist');
    });
  });

  it('Insert duplicate role', () => {
    cy.get('[data-test="btn-add-role-list"]').click();
    cy.get('[data-test="name"]').type('Admin');
    cy.get('[data-test="menus"]')
      .click()
      .get('mat-option')
      .contains('Setting')
      .click();

    cy.get('body').click();

    cy.intercept({
      url: '/api/roles',
      method: 'POST',
    }).as('storeRole');

    cy.get('[data-test="btn-save-form"]').click();

    cy.wait('@storeRole').then((interception) => {
      cy.get('[data-test="error"]').should('exist');
      cy.get('[data-test="btn-cancel-form"]').click();
    });
  });

  it('Edit role', () => {
    cy.get('[data-test="btn-edit"]').last().click();
    cy.get('[data-test="name"]').clear();
    cy.get('[data-test="name"]').type('Staff');

    cy.intercept({
      url: '/api/roles/*',
      method: 'PATCH',
    }).as('updateRole');

    cy.get('[data-test="btn-save-form"]').click();

    cy.wait('@updateRole').then((interception) => {
      cy.get('[data-test="error"]').should('not.exist');
    });
  });

  it('Delete Role', () => {
    cy.get('[data-test="btn-delete"]').last().click();

    cy.intercept({
      url: '/api/roles/*',
      method: 'DELETE',
    }).as('deleteRole');

    cy.get('[data-test="btn-yes"]').click();

    cy.wait('@deleteRole').then((interception) => {
      cy.get('[data-test="error"]').should('not.exist');
    });
  });
});
