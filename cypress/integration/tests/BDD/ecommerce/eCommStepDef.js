/// <reference types="Cypress" />
import { homePage } from "../../../../support/pageObjects/HomePage"
import { productPage } from "../../../../support/pageObjects/ProductPage"
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
//cypress run --spec cypress\integration\tests\BDD\*.feature --headed --browser chrome
//npx cypress-tags run -e TAGS="@Smoke" --headed --browser chrome

let name
Given('I open ECommerce Page', () => {
    cy.visit(Cypress.env('url'))
})

// When I add items to Cart
When('I add items to Cart', function () {
    homePage.getShopTag().click()
    globalThis.data.productsNames.forEach((element) => {
        cy.selectProduct(element)
    })
    productPage.getCheckoutButton().click()
})

//And Validate the total prices
And('Validate the total prices', () => {
    let sum = 0
    cy.get("tr td:nth-child(4) strong")
        .each(($el, index, $list) => {
            const price = $el.text()
            let actualPrice = price.split(" ")
            actualPrice = actualPrice[1].trim()
            sum += Number(actualPrice)
            cy.log(sum)
        })
        .then(() => {
            cy.get("h3 > strong").should("contain", sum)
        })
})

//Then select the country submit and verify Thankyou
Then('select the country submit and verify Thankyou', () => {
    cy.contains("Checkout").click()
    cy.get("#country").type("India")
    cy.get(".suggestions > ul > li > a").click()
    cy.get("#checkbox2").check({ force: true })
    cy.get(".ng-untouched > .btn").click()
    //cy.get('.alert').should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
    cy.get(".alert").then((element) => {
        const message = element.text()
        expect(message.includes("Success")).to.be.true
    })
})
//When I fill the form details
When('I fill the form details', function (dataTable) {
    //1
    //   homePage.getNameForm().type(globalThis.data.name)
    //   cy.get("select").select(globalThis.data.gender)
    //   homePage.getEmailForm().type(globalThis.data.email)

    //2
    // |name        | gender | email|
    // |bob Nguyen  | Female | bob@as.com|
    name = dataTable.rawTable[1][0]
    homePage.getNameForm().type(name)
    cy.get("select").select(dataTable.rawTable[1][1])
    homePage.getEmailForm().type(dataTable.rawTable[1][2])
})
// Then validate the forms behaviour
Then('validate the forms behaviour', function () {
    homePage.getTwoWayDataBinding().should("have.value", name)
    homePage.getNameForm().should("have.attr", "minlength", 2)
    homePage.getNameForm().should("have.attr", "required")
    homePage.getRadioDisableButton().should("be.disabled")
    Cypress.config('defaultCommandTimeout', 8000)
})













