Feature: Validate API

  @API @TC-01
  Scenario: API GET Method
    Given I open Angular Page
    When I send GET Method
    Then Result should one book


  @API @TC-02
  Scenario: API Test override url request
    Given I open Angular Page
    When I send API GET Method GetBook
    Then I expect return code 404


  @API @TC-03
  Scenario: API POST Method
    Given I open Angular Page
    When I send API POST Method
    Then I expect return code 200
