describe('Teste de Login - Saucedemo', () => {
  // Visita a página de login
  it('Verifica campos de entrada e login com credenciais válidas', () => {
    // Acessar a URL de login
    cy.visit('https://www.saucedemo.com/v1/index.html');

    // Verificar se os campos de entrada estão presentes
    cy.get('input#user-name').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('input#login-button').should('be.visible');

    // Inserir credenciais válidas
    const username = 'standard_user';
    const password = 'secret_sauce';

    cy.get('input#user-name').type(username);
    cy.get('input#password').type(password);

    // Submeter o formulário de login
    cy.get('input#login-button').click();

    // Verificar se o redirecionamento para a página principal ocorreu
    cy.url().should('include', '/inventory.html');

    // Verificar se o título da página está correto (opcional)
    cy.title().should('eq', 'Swag Labs');
  });

  // Teste com login inválido
  it('Tenta fazer login com credenciais inválidas', () => {
    cy.visit('https://www.saucedemo.com/v1/index.html');

    cy.get('input#user-name').type('invalid_user');
    cy.get('input#password').type('invalid_password');
    cy.get('input#login-button').click();

    // Verificar se a mensagem de erro aparece
    cy.get('.error-message-container')
      .should('be.visible')
      .and('contain', 'Epic sadface: Username and password do not match any user in this service');
  });
});
