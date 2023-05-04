import AssignmentComponent from '../AssignmentComponent.vue'
import dataJSON from '../../../cypress/fixtures/example.json'
const assignment = dataJSON.sample_assignment

describe('<AssignmentComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AssignmentComponent, { props: {
      assignment:assignment.assignment,
      createdAt:assignment.createdAt,
      displayName:assignment.displayName,
      versionNumber:assignment.versionNumber,
      } })
    // ensure all the data is rendered
    cy.contains(assignment.assignment.name)
    cy.contains(`${assignment.assignment.size} (bytes)`)
    cy.contains(assignment.assignment.type)
    cy.contains(assignment.createdAt)
    cy.contains(assignment.displayName)
    cy.contains(`VERSIÓN ${assignment.versionNumber}`)
    // ensure the download button works
    cy.window().then((win) => {
      cy.stub(win, 'open').as("popup")
  })
  cy.get('a').click()
  cy.get('@popup')
      .should("be.calledWith", assignment.assignment.url)
  })
})