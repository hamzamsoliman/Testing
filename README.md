# Cypress Test Automation Framework

This repository contains automated tests for web applications using Cypress, a modern front-end testing tool built for the modern web.

## 🚀 Features

- **End-to-End Testing** - Comprehensive test coverage for web applications
- **Page Object Model** - Organized test structure using Page Object design pattern
- **Cucumber BDD** - Behavior-driven development with Gherkin syntax
- **Modular Framework** - Reusable components and utilities

## 📂 Project Structure

```
cypress/
├── e2e/                # Test files
├── fixtures/           # Test data
├── pages/              # Page object models
├── step_definitions/   # Cucumber step definitions
└── support/           # Custom commands and utilities
```

## 🛠️ Prerequisites

- Node.js (v14 or later)
- npm (comes with Node.js)
- Google Chrome (latest version)

## ⚙️ Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/hamzamsoliman/Testing.git
   cd Testing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Open Cypress Test Runner:
   ```bash
   npx cypress open
   ```

## 🧪 Running Tests

### Run all tests in headless mode
```bash
npx cypress run
```

### Run a specific test file
```bash
npx cypress run --spec "cypress/e2e/login-page.cy.js"
```

### Run tests in a specific browser
```bash
npx cypress run --browser chrome
# or
npx cypress run --browser firefox
```

## 🧩 Included Tests

- **Login Functionality** - Tests for user authentication
- **Navigation** - Tests for site navigation
- **Shopping Cart** - Tests for cart functionality
- **Checkout Process** - End-to-end checkout flow

## 📝 Reporting

Test results are automatically generated in the `cypress/results` directory after each run.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
