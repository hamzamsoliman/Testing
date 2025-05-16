describe("login functionality", () => {
  before(function () {
    cy.fixture("example").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(function () {
    cy.visit(data.loginPageUrl);
  });

  it("[1] Valid Login for Standard User", () => {
    //using selecting by attribute
    cy.Username().type("standard_user");
    cy.Password().type(data.UsualPassword);
    cy.login();

    //Assertions
    cy.url().should("include", "inventory");
    // Assert that the product list container is visible
    cy.get(".inventory_list").should("be.visible");
    // Assert that the page title is "Products"
    cy.get(".title").should("have.text", "Products");
  });

  ///////////////////////////////////////////////////////////////

  it.skip("[2] Valid Login for Problem User", () => {
    cy.Username().type("problem_user");
    cy.Password().type("data.UsualPassword");
    cy.login();

    //Assertions
    // Assert redirection to inventory page
    cy.url().should("include", "inventory");

    // Check that product list is visible
    cy.get(".inventory_list").should("be.visible");

    let imageSources = [];

    cy.get(".inventory_item_img img").each((imgElement) => {
      // Get the native DOM element's src attribute
      const src = imgElement[0].getAttribute("src");

      // Check for duplicate image
      if (imageSources.includes(src)) {
        assert.fail(`Duplicate image found: ${src}`);
      }

      // Store the src in our list
      imageSources.push(src);

      // Check if the image loads successfully
      cy.request({
        url: src,
        failOnStatusCode: false,
      }).then((response) => {
      
        expect(response.status, `Image should load successfully`);
      });
    });
  });

  ///////////////////////////////////////////////////////////////

  it.skip("[3] invalid username", () => {
    // Enter invalid credentials
    cy.Username().type("invalid_user");
    cy.Password().type("data.UsualPassword");

    cy.login();

    //  Assertions
    cy.get('[data-test="error"]')
      //  Error message element is in the DOM
      .should("exist")
      //  Error message contains expected text
      .should("contain.text", "do not match")
      //  Element has correct attribute
      .should("have.attr", "data-test", "error");
  });

  ///////////////////////////////////////////////////////////////

  it.skip("[4] Invalid Password", () => {
    // Enter username and wrong password
    cy.Username().type("standard_user");
    cy.Password().type("wrong_password");
    cy.login();

    // Assert error message is displayed
    cy.get('[data-test="error"]')
      // Ensure the element exists
      .should("exist")
      // Assert that the error message contains the expected text
      .should(
        "contain.text",
        "Epic sadface: Username and password do not match any user in this service"
      )
      // check that it's not "visibility: hidden"
      .should("have.css", "visibility")
      .and("not.eq", "hidden");
  });

  ///////////////////////////////////////////////////////////////

  it.skip("[5] Empty Credentials ", () => {
    // Leave both fields empty and click login
    cy.Username().clear();
    cy.Password().clear();
    cy.login();

    // Assert that the error message exists
    cy.get('[data-test="error"]')
      // Check if the error message element exists
      .should("exist")
      // Assert that the error message contains the expected text
      .should("contain.text", "Username is required")
      .should("be.visible");
  });
});
