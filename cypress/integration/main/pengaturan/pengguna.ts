describe('Pengguna', () => {
  before(() => {
    cy.login().visit('/pengaturan');
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

    cy.get('[data-test="btn-add-form"]').click();

    cy.get('[data-test="alert"').should('not.exist');
  });
});
