/// <reference types="Cypress" />

describe('My Second Test Suite', function () {
    it('My FirstTest case', function () {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product')
            .each(($el, index, $list) => {
                const textVeg = $el.find('h4.product-name').text()
                if (textVeg.includes('Cashews')) {
                    cy.wrap($el).find("button").click()
                }
            })
        cy.get(".cart-icon").click()
        cy.get(".cart-items")
            .find(".cart-item")
            .each(($el, index, $list) => {
                const findCap = $el.find("p.product-name").text()
                expect(findCap).to.contain("Cashews")
            })
        cy.contains("PROCEED TO CHECKOUT").click()
        cy.contains("Place Order").click()
        cy.get('.chkAgree').click({force: true})
        cy.get('button').click()
        cy.get('.wrapperTwo > span').then(function (element) {
            const actualText = element.text()
            expect(actualText.includes("Thank you")).to.be.true
        })
    })
})