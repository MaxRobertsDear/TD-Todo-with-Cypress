import { isContext } from "vm";

describe(`Input form`, () => {
  
  beforeEach(() => {
    cy.visit('/')
  })
  
  it(`focuses input on load`, () => {
    cy.focused()
      .should(`have.class`, `new-todo`)
  })
  it(`accepts input`, () => {
    let typedText = `Buy milk`
    cy.get(`.new-todo`)
      .type(typedText)
      .should(`have.value`, typedText)
  })

  context(`Form submission`, () => {
    it(`adds a new todo on submit`, () => {
      const newItem = 'buy eggs'
      cy.server()
      cy.route('POST', '/api/todos', {
        name: newItem,
        id: 1, 
        isComplete: false 
      })
      cy.get('.new-todo')
        .type(newItem)
        .type('{enter}')
        .should('have.value', '')
      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', newItem)
    })

    it.only('shows error message on failed submissoin', () => {
      cy.server()
      cy.route({
        url: '/api/todos',
        method: 'POST', 
        status: 500, 
        response: {} 
      })
      cy.get('.new-todo')
        .type('test{enter}')

      cy.get('.todo-list li')
        .should('not.exist')

      cy.get('.error')
        .should('be.visible')
    })
  })
})