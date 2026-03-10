# Sauce Demo Playwright Automation

Automated end-to-end tests for the Sauce Demo web application using Playwright with the Page Object Model (POM) design pattern.

The test suite validates core user flows including authentication, product inventory interactions, and cart functionality.

---

# Tech Stack

- Playwright — End-to-end test automation framework
- JavaScript / Node.js
- Allure Report — Test reporting
- Page Object Model (POM) — Maintainable test structure
- Dotenv (.env) — Environment configuration

---

# Project Structure

```
.
├── tests/
│   ├── auth.spec.js
│   ├── inventory.spec.js
|   ├── inventory-item.spec.js
│   └── cart.spec.js
│
├── pages/
│   ├── basePage.js
│   ├── CartPage.js
│   ├── index.js
│   ├── InventoryPage.js
│   ├── LoginPage.js
│   └── ProductDetailPage.js
│
├── fixtures/
│   └── testFixtures.js
│
├── playwright.config.js
└── package.json
```

### Description

| Folder   | Purpose                    |
|----------|----------------------------|
| tests    | Contains test cases        |
| pages    | Page Object classes        |
| fixtures | Custom Playwright fixtures |
| utils    | Helper functions           |
| config   | Playwright configuration   |

---

# Installation

Clone the repository

```bash
git clone <repo-url>
cd <repo-name>
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

```
BASE_URL=https://www.saucedemo.com
```

---

# Running Tests

Run all tests

```bash
npx playwright test
```

Run tests in headed mode

```bash
npx playwright test --headed
```

Run a specific test file

```bash
npx playwright test tests/inventory.spec.js
```

Run tests in debug mode

```bash
npx playwright test --debug
```

---

# Test Coverage

Current automated test coverage includes:

### Authentication

- Valid login
- Invalid login
- Locked out user validation
- Error message validation

### Inventory Page

- Products are displayed
- Sorting by price
- Sorting by product name
- Add item to cart
- Remove item from cart

### Cart Page

- Cart displays selected items
- Item details match inventory page
- Remove item from cart

### Not Yet Implemented

- Checkout flow
- Order completion validation

---

# Reporting

This project uses Allure Report for test reporting.

Generate report

```bash
npx allure generate
```

Open report

```bash
npx allure open
```

---

# Test Design Principles

The test framework follows these principles:

- Stateless tests — tests are independent
- Page Object Model for maintainability
- Reusable fixtures
- Clear separation between tests and page logic

---

# Future Improvements

Potential enhancements:

- Checkout flow automation
- Parallel execution configuration
- CI/CD integration
- API validation for backend responses
- Visual regression testing

---

## 📊 Live Test Report
https://allyzs.github.io/sauce-demo-playwright-javascript/

---

# Author
-- Ally