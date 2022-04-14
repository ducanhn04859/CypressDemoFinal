/// <reference types="Cypress" />
describe('My First Test Suite', function () {
    it('Test case add products to cart', function () {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        //selenium get hit url in browser, cypress get acts like findElement of selenium
        cy.get('.product').should('have.length', 5)
        cy.get('.product:visible').should('have.length', 4)
        //Parent child chaining
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').should('have.length', 4)
        cy.get(':nth-child(3) > .product-action > button').click()
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click().then(function () {
            console.log('sf')
        })
        //add product with name: "Cashews" to cart
        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
            const textVeg = $el.find('h4.product-name').text()
            if (textVeg.includes('Cashews')) {
                cy.wrap($el).find("button").click()
            }
        })
        //assert if logo text is correctly displayed
        cy.get('.brand').should('have.text', 'GREENKART')
        //this is to print in logs
        cy.get('.brand').then(function (logoelement) {
            cy.log(logoelement.text())
        })
    })
    it("Test case check logo text", () => {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('input[type="search"]').type("ca")
        cy.wait(2000)
        //create variable for cypress
        cy.get(".products").as("productsVariable")
        // cy.get(".products").find(".product").eq(1).contains("ADD TO CART").click()
        cy.get("@productsVariable")
            .find(".product")
            .eq(1)
            .contains("ADD TO CART")
            .click()

        //assert if logo text is correctly displayed
        cy.get(".brand").should("have.text", "GREENKART")
    })
})