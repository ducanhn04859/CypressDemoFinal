Feature: End to end Ecommerce validation

  @Ecom @TC-01
  Scenario: Ecommerce products delivery
    Given I open ECommerce Page
    When I add items to Cart
    And Validate the total prices
    Then select the country submit and verify Thankyou

  @Ecom @TC-02
  Scenario: Filling the form to shop
    Given I open ECommerce Page
    When I fill the form details
      |name        | gender | email|
      |bob Nguyen  | Female | bob@as.com|
    Then validate the forms behaviour




