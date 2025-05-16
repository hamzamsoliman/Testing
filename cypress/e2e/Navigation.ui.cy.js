describe("login functionality", () => {
  before(function () {
    cy.fixture("example").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(function () {
    cy.visit(data.loginPageUrl);
  });

  it("Cart Icon Navigation - Redirects to Cart Page", () => {
    cy.Username().type("standard_user");
    cy.Password().type(data.UsualPassword);
    cy.login();

    // Click the cart icon
    cy.get(".shopping_cart_link").click();

    // URL should include '/cart.html'
    cy.url().should("include", "/cart.html");

    // Page should contain the cart list container
    cy.get(".cart_list").should("be.visible");

    // Page title or header should say "Your Cart"
    cy.get(".title").should("have.text", "Your Cart");
  });

////////////////////////////////////////////////////////////////

  it("Menu Navigation - Clicking All Items Reloads Inventory Page", () => {
    cy.Username().type("standard_user");
    cy.Password().type(data.UsualPassword);
    cy.login();

    //  Open the left menu
    cy.get("#react-burger-menu-btn").click();

    // Menu becomes visible
    cy.get(".bm-menu-wrap").should("be.visible");

    // Click "All Items"
    cy.get("#inventory_sidebar_link").click();

    // URL should include '/inventory.html'
    cy.url().should("include", "/inventory.html");

    // Product list is visible (confirming page loaded)
    cy.get(".inventory_list").should("be.visible");
  });

/////////////////////////////////////////////////////////////////////

it.only ('Filter Button Functionality', () => {
    

    cy.Username().type('standard_user');
    cy.Password().type(data.UsualPassword);
    cy.login();

    // Go to inventory page
    cy.url().should('include', '/inventory.html');

    // Open filter dropdown and select "Price (low to high)"
    cy.get('.product_sort_container').select('Price (low to high)');

    // Wait for products to load and assert order of products
    // First item should have the lowest price
    cy.get('.inventory_item_price').first().should('have.text', '$7.99');  

    // Ensure products are sorted by price in ascending order
    cy.get('.inventory_item_price').eq(0).should('have.text', '$7.99');

    // Apply another filter, "Name (A to Z)"
    cy.get('.product_sort_container').select('Name (A to Z)');

    // Ensure the first product's name is alphabetically first
    // Alphabetically first item
    cy.get('.inventory_item_name').first().should('have.text', 'Sauce Labs Backpack');  

    // Apply filter "Name (Z to A)" and check
    cy.get('.product_sort_container').select('Name (Z to A)');

    // Ensure the first product's name is alphabetically last
    // Alphabetically last item
    cy.get('.inventory_item_name').first().should('have.text', 'Test.allTheThings() T-Shirt (Red)');  
});


//////////////////////////////////////////////////////////////////

  it("Logout Functionality - Redirects to Login Page", () => {
    cy.Username().type("standard_user");
    cy.Password().type(data.UsualPassword);
    cy.login();

    // Open the left menu
    cy.get("#react-burger-menu-btn").click();

    // Menu should be visible
    cy.get(".bm-menu-wrap").should("be.visible");

    // Click the "Logout" link
    cy.get("#logout_sidebar_link").click();

    // URL should be back to the login page
    cy.url().should("eq", data.loginPageUrl);

    // Login form is visible again
    cy.get('[data-test="login-button"]').should("be.visible");
  });

////////////////////////////////////////////////////////////////

it('About Button in Side Menu ', () => {
    
    cy.Username().type('standard_user');
    cy.Password().type(data.UsualPassword);
    cy.login();

    // Open the left menu
    cy.get('#react-burger-menu-btn').click();  // Open the side menu

    // Click on the 'About' button
    cy.contains('About').click();  // Click the About button in the menu

    // Assert that the URL changes to the About page URL
    cy.url().should('include', 'https://saucelabs.com/');

    // Ensure the About page contains the title or some identifying text
    cy.get('h1').should('contain', 'Sauce Labs');
});


});
