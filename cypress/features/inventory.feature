Feature: Inventory Page Functionality
  As a user
  I want to interact with the inventory page
  So that I can browse and manage products

  Scenario: Add item to cart
    Given I am logged in as a standard user
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"
    And the "Add to Cart" button should change to "Remove"

  Scenario: Remove item from cart
    Given I am logged in as a standard user
    And I have "Sauce Labs Backpack" in my cart
    When I remove "Sauce Labs Backpack" from the cart
    Then the cart badge should not be visible
    And the "Remove" button should change to "Add to Cart"

  Scenario: Sort items by price low to high
    Given I am logged in as a standard user
    When I sort items by "Price (low to high)"
    Then the items should be sorted by price in ascending order 