import MessageComponent from '../MessageComponent.vue'
import dataJSON from '../../../cypress/fixtures/example.json'
const message = dataJSON.sample_message

describe('<MessageComponent />', () => {
  it('sent message', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(MessageComponent, { props: {
      msg:message.text,
      displayName:message.displayName,
      photoUrl:message.photoURL,
      isSender:true,
      createdAt:message.createdAt
      } })
    cy.contains(message.text)
    cy.contains(message.displayName)
    cy.contains(message.createdAt)
    cy.get('img').should('have.attr', 'src', message.photoURL)
    // ensures classes are applied for correct message color and alignment given isSender is true
    cy.get('.bg-blue-600.text-white.max-w-sm.p-2.h-fit.rounded')
    cy.get('.flex.mb-4.flex-row-reverse')
    
  })
  it('received message', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(MessageComponent, { props: {
      msg:message.text,
      displayName:message.displayName,
      photoUrl:message.photoURL,
      isSender:false,
      createdAt:message.createdAt
      } })
    cy.contains(message.text)
    cy.contains(message.displayName)
    cy.contains(message.createdAt)
    cy.get('img').should('have.attr', 'src', message.photoURL)
    // ensures classes are applied for correct message color and alignment given isSender is false
    cy.get('.bg-gray-200.text-black.max-w-sm.p-2.h-fit.rounded')
    cy.get('.flex.mb-4.flex-row')
  })
})