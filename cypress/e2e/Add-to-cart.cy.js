describe("Add to cart functionality", () => {
  before(function () {
    cy.fixture("example").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(function () {
    cy.visit(data.loginPageUrl);
  });
  it("Add Item to Cart", () => {
    cy.Username().type("standard_user");
    cy.Password().type(data.UsualPassword);
    cy.login();

    // Assert successful login by checking URL
    cy.url().should("include", "/inventory.html");

    // Click "Add to Cart" for the first product (Backpack in this case)
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Assert that the button text changed to "Remove"
    cy.get('[data-test="remove-sauce-labs-backpack"]').should("exist"); 

    // Assert that the cart badge exists and shows the correct item count
    cy.get(".shopping_cart_badge").should("have.text", "1");  
    // Assert that the cart badge has a visible red background color
    cy.get(".shopping_cart_badge")
      .should("have.css", "background-color")
      .and("eq", "rgb(226, 35, 26)"); 
  });
//////////////////////////////////////////////////////////////

  it("Remove Item from Cart", () => {
    cy.Username().type("standard_user");
    cy.Password().type(data.UsualPassword);
    cy.login();

    // Add item to cart (e.g: Backpack)
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Assert item is added - cart badge should show 1
    cy.get(".shopping_cart_badge").should("have.text", "1"); 

    // Click "Remove" to remove the item
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();

    // Assert cart badge is removed (should not exist anymore)
    cy.get(".shopping_cart_badge").should("not.exist"); 

    // Assert "Add to Cart" button is visible again
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should(
      "be.visible"
    );
  });

/////////////////////////////////////////////////////////////

  it("Empty Cart Checkout", () => {
    cy.Username().type("standard_user");
    cy.Password().type(data.UsualPassword);
    cy.login();

    // Go directly to the cart page (without adding items)
    cy.get(".shopping_cart_link").click();

    // URL should be /cart.html
    cy.url().should("include", "/cart.html");

    // There should be no cart items listed
    cy.get(".cart_item").should("have.length", 0);

    // Click checkout (still allowed by the app)
    cy.get('[data-test="checkout"]').click();

    // On checkout step one page
    cy.url().should("include", "/checkout-step-one.html");
  });

//////////////////////////////////////////////////////////////

it('Checkout Flow - Successful Completion', () => {
    
    
    cy.Username().type('standard_user');
    cy.Password().type(data.UsualPassword);
    cy.login();


    // Add an item to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Go to cart
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');

    // Click Checkout
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');

    // Enter checkout info
    cy.get('[data-test="firstName"]').type('hamza');
    cy.get('[data-test="lastName"]').type('mohamed');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();

    // Confirm overview page, then finish
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('[data-test="finish"]').click();

    // URL ends with /checkout-complete.html
    cy.url().should('include', '/checkout-complete.html');

    // Complete message is visible
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');

    // Confirmation image is visible
    cy.get('.pony_express').should('be.visible');
});

///////////////////////////////////////////////////////////////

it('Checkout - Missing', () => {
    
    
    cy.Username().type('standard_user');
    cy.Password().type(data.UsualPassword);
    cy.login();

    // Add an item to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Go to cart and start checkout
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    // Leave fields empty and try to continue
    cy.get('[data-test="continue"]').click();

    // Error message container appears
    cy.get('[data-test="error"]').should('be.visible');

    // Error message text is correct
    cy.get('[data-test="error"]').should('have.text', 'Error: First Name is required');

    // Error icon appears next to first input
    cy.get('.input_error.form_input').first().should('have.class', 'error');
});


});
