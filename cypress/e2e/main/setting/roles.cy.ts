describe('Roles', () => {
  beforeEach(() => {
    cy.login().visit('/setting/roles');
  });

  it('Insert role', () => {
    cy.get('[data-test="btn-add-role-list"]').click();
    cy.get('[data-test="name"]').type('Perawat');

    cy.get('body').click();

    cy.get('[data-test="btn-save-form"]').click();

    cy.wait(500);

    cy.get('[data-test="error"]').should('not.exist');
  });

  it('Insert duplicate role', () => {
    cy.get('[data-test="btn-add-role-list"]').click();
    cy.get('[data-test="name"]').type('Perawat');

    cy.get('body').click();

    cy.get('[data-test="btn-save-form"]').click();

    cy.wait(500);

    cy.get('[data-test="error"]').should('exist');
    cy.get('[data-test="btn-cancel-form"]').click();
  });

  it('Delete Role', () => {
    cy.get('[data-test="btn-delete"]').last().click();

    cy.get('[data-test="btn-yes"]').click();

    cy.wait(500);

    cy.get('[data-test="error"]').should('not.exist');

    cy.get('[data-test="confirm-form"]').should('not.exist');
  });

  it('Insert access control', () => {
    cy.get('[data-test="btn-detail"]').last().click();

    cy.url().should('match', /\/setting\/roles\/*/);

    cy.get('[data-test="btn-slide"]').first().click();

    cy.wait(500);

    cy.get('[data-test="btn-slide"][ng-reflect-checked="false"]')
      .first()
      .should('exist');

    cy.get('[data-test="btn-slide"]').first().click();

    cy.wait(500);

    cy.get('[data-test="btn-slide"][ng-reflect-checked="true"]')
      .first()
      .should('exist');
  });
});
