describe('Role', () => {
  before(() => {
    cy.login().visit('/pengaturan');
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('laravel_session', 'XSRF-TOKEN');
  });

  it('Insert Role', () => {
    cy.get('[data-test="btn-role-tab"]').click();
    cy.get('[data-test="btn-add-list"]').click();
    cy.get('[data-test="name"]').type('Perawat');
    cy.get('[data-test="menus"]')
      .click()
      .get('mat-option')
      .contains('Pendaftaran')
      .click();

    cy.get('body').click();

    cy.intercept({
      url: '/api/roles',
      method: 'POST',
    }).as('storeRole');

    cy.get('[data-test="btn-save-form"]').click();

    cy.wait('@storeUser').then((interception) => {
      cy.get('[data-test="error"]').should('not.exist');
    });
  });

  it('Edit Role', () => {
    cy.get('[data-test="btn-edit"]').last().click();
    cy.get('[data-test="name"]').type('Staff');
    cy.get('[data-test="menus"]')
      .click()
      .get('mat-option')
      .contains('Pendaftaran')
      .click();

    cy.get('body').click();

    cy.intercept({
      url: '/api/roles/*',
      method: 'PATCH',
    }).as('patchRole');

    cy.get('[data-test="btn-save-form"]').click();

    cy.wait('@patchRole').then((interception) => {
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
