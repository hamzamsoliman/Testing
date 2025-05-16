Feature: Checkout Process
  As a user
  I want to complete the checkout process
  So that I can purchase my selected items

  Scenario: Complete checkout with valid information
    Given I am logged in as a standard user
    And I have "Sauce Labs Backpack" in my cart
    When I proceed to checkout
    And I enter my shipping information
      | firstName | John    |
      | lastName  | Doe     |
      | zipCode   | 12345   |
    And I continue to the overview
    Then I should see the order summary
    When I finish the checkout
    Then I should see the order confirmation message

  Scenario: Attempt checkout with missing information
    Given I am logged in as a standard user
    And I have "Sauce Labs Backpack" in my cart
    When I proceed to checkout
    And I continue to the overview without entering information
    Then I should see an error message 