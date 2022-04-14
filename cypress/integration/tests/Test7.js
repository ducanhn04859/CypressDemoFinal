/// <reference types="Cypress" />

describe('My 7 Test Suite', function () {
    it('My FirstTest case', function () {
        //Check boxes
        cy.visit("http://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#opentab').then(function (el) {
            const url = el.prop('href')
            cy.log(url)
            // cy.visit(url)
            //rahulshettyacademy.com/seleniumpractise

        })
    })
})




























