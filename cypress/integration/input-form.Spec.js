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
    it.only(`adds a new todo on submit`, () => {
      cy.server()
      cy.route('POST', '/api/todos', {
        name: 'buy eggs',
        id: 1, 
        isComplete: false 
      })
      cy.get('.new-todo')
        .type('buy eggs')
        .type('{enter}')
    })
  })
})