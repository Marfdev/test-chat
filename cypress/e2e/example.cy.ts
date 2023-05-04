// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.login()
    localStorage.setItem('token', 'test-Token')
    cy.visit('/')
    cy.wait(1000)
    cy.get('input[type="text"]').type('e2e test message')
    cy.get('button[type="submit"].msg-btn').click()
    cy.get('input[type="file"]').selectFile('blur.png')
    cy.get('button[type="submit"].file-submit').click()
    cy.get('input[type="text"]').type('e2e test message on enter {enter}')
    cy.get('.message-container').scrollTo('bottom')
    cy.window().then((win) => {
      cy.stub(win, 'open').as("popup")
  })
  cy.get('a').last().click()
  cy.get('@popup').should("be.called")
  cy.get('button.x-btn-signout').click()
  cy.logout()
  })
})
