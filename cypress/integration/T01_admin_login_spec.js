/* eslint-disable no-undef */
describe('Admin login', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000/login')
    })

    it('admin can log in', function() {
        cy.get('#un').type('adminTesti')
        cy.get('#pw').type('secret')
        cy.contains('Login').click()
        cy.contains('Add restaurant')
    })

    it('admin can log out', function() {
        cy.get('#un').type('adminTesti')
        cy.get('#pw').type('secret')
        cy.contains('Login').click()
        cy.contains('Logout').click()
    })
})