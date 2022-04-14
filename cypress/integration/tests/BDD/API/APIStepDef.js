/// <reference types="Cypress" />
import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";

let returnCode;
let returnBody;

Given('I open Angular Page', () => {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
})

When('I send GET Method', function () {
    cy.intercept({
        method: 'GET', url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
    }, {
        statusCode: 200, body: [{
            "book_name": "RestAssured with Java", "isbn": "RSU", "aisle": "2301"
        }]
    }).as('bookretrievals')
    cy.get("button[class='btn btn-primary']").click()
})

Then('Result should one book', () => {
    cy.wait('@bookretrievals').should(({request, response}) => {
        cy.get('tr').should('have.length', response.body.length + 1)
    })
    cy.get('p').should('have.text', 'Oops only 1 Book available')
})

When('I send API GET Method GetBook', function () {
    cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {
        req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra123"
        req.continue((res) => {
            returnCode = res.statusCode;
            expect(res.statusCode).to.equal(404)
        })
    }).as("dummyUrl")
    cy.get("button[class='btn btn-primary']").click()
    cy.wait('@dummyUrl')
})

Then('I expect return code 404', () => {
    expect(returnCode).to.equal(200)
})

When('I send API POST Method', function () {
    cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', {
        "name": "Learn Appium Automation with Java", "isbn": "bcggsss", "aisle": "22s7", "author": "John foe"
    }).then(function (response) {
        expect(response.status).to.eq(200)
        returnCode = response.status;
        returnBody = response.body;
    })
})

Then('I expect return code 200', () => {
    expect(returnBody).to.have.property("Msg", "successfully added")
    expect(returnCode).to.equal(200)
})