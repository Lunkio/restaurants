/* eslint-disable no-undef */
describe('adding restaurant', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000/login')
        cy.get('#un').type('adminTesti')
        cy.get('#pw').type('secret')
        cy.contains('Login').click()
    })

    it('restaurant can be added', function() {
        cy.get('#name').type('Cypress Ravintola')
        cy.get('#latitude').type('60.181236267089844')
        cy.get('#longitude').type('24.883358001708984')
        cy.get('#cowSuomi').click()
        cy.get('#porkOrigin').type('Saksa')
        cy.get('#porkEu').click()
        cy.get('#chickenOrigin').type('Brasilia')
        cy.get('#chickenNonEu').click()
        cy.get('#lambSuomi').click()
        cy.contains('Add Restaurant').click()
        cy.wait(5000)
    })
})