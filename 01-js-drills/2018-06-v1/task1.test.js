// Import testing functions from Vitest
// - test: defines a test case
// - expect: makes assertions about values
import { test, expect } from "vitest";

// Import the functions we want to test from task1.js
import { calculateEstimate, formatEstimate } from "./task1.js";

// Import PRICES data to use as "source of truth" in tests
import { PRICES } from "./prices.js";

/**
 * Helper function: Calculates expected subtotal from PRICES
 *
 * Why: Instead of hardcoding expected values (like 340), we calculate them
 * from the PRICES object. This way if prices change, tests still work.
 *
 * How it works: Takes component choices and looks up each price in PRICES,
 * then adds them all together.
 */
function calculateExpectedSubtotal(choices) {
  return (
    PRICES.processor[choices.processor] +
    PRICES.ram[choices.ram] +
    PRICES.storage[choices.storage] +
    PRICES.screen[choices.screen] +
    PRICES.caseType[choices.caseType] +
    PRICES.usbPorts[choices.usbPorts]
  );
}

// ==============================================================================
// TEST 1: Basic Structure and Calculation
// ==============================================================================
/**
 * Purpose: Verify that calculateEstimate returns the correct structure
 * and calculates prices accurately for a basic build
 *
 * What it tests:
 * - Return object has all required properties
 * - Subtotal matches sum of component prices
 * - Total with markup is exactly 20% more than subtotal
 * - Individual component prices are correct
 */
test("returns correct structure and calculations", () => {
  // Arrange: Set up test data (a mid-range computer build)
  const choices = {
    processor: "p5",
    ram: "16GB",
    storage: "2TB",
    screen: '19"',
    caseType: "Mini Tower",
    usbPorts: "2",
  };

  // Act: Call the function we're testing
  const result = calculateEstimate(choices);

  // Calculate what the subtotal SHOULD be using our helper function
  const expectedSubtotal = calculateExpectedSubtotal(choices);

  // Assert: Check that the result has the correct structure
  // toHaveProperty checks if an object has a specific key
  expect(result).toHaveProperty("componentPrices");
  expect(result).toHaveProperty("subtotal");
  expect(result).toHaveProperty("totalWithMarkup");

  // Assert: Check that calculations are correct
  // toBe checks exact equality (for numbers, strings, booleans)
  expect(result.subtotal).toBe(expectedSubtotal);

  // toBeCloseTo is for floating point numbers (handles rounding issues)
  // Checks that totalWithMarkup = subtotal * 1.2 (20% markup)
  expect(result.totalWithMarkup).toBeCloseTo(result.subtotal * 1.2);

  // Assert: Check individual component prices match PRICES source of truth
  expect(result.componentPrices.processor).toBe(PRICES.processor.p5);
  expect(result.componentPrices.ram).toBe(PRICES.ram["16GB"]);
});

// ==============================================================================
// TEST 2: High-End Build Calculation
// ==============================================================================
/**
 * Purpose: Verify calculations work for expensive components
 *
 * What it tests:
 * - Same calculation logic works for different price points
 * - Ensures the function handles all component options correctly
 *
 * Why this matters: Tests a different scenario to catch edge cases
 */
test("calculates correctly for high-end build", () => {
  // Arrange: Set up test data (expensive components)
  const choices = {
    processor: "p7",      // Most expensive processor
    ram: "32GB",          // Most expensive RAM
    storage: "2TB",       // Most expensive storage
    screen: '23"',        // Most expensive screen
    caseType: "Midi Tower", // Most expensive case
    usbPorts: "4",        // Most expensive USB option
  };

  // Act: Calculate the estimate
  const result = calculateEstimate(choices);

  // Calculate expected value from PRICES
  const expectedSubtotal = calculateExpectedSubtotal(choices);

  // Assert: Verify calculations are correct
  expect(result.subtotal).toBe(expectedSubtotal);
  expect(result.totalWithMarkup).toBeCloseTo(expectedSubtotal * 1.2);
});

// ==============================================================================
// TEST 3: Error Handling - Invalid Processor
// ==============================================================================
/**
 * Purpose: Verify that invalid component choices throw an error
 *
 * What it tests:
 * - Function throws error when processor doesn't exist in PRICES
 * - Error message is correct
 *
 * Why this matters: Prevents crashes and gives clear feedback for bad input
 */
test("throws for invalid processor", () => {
  // Assert: Expect the function to throw an error
  // We wrap the function call in an arrow function so expect can catch the error
  expect(() =>
    calculateEstimate({
      processor: "p9",  // This processor doesn't exist in PRICES!
      ram: "16GB",
      storage: "1TB",
      screen: '19"',
      caseType: "Mini Tower",
      usbPorts: "2",
    })
  ).toThrow("Invalid component choice");  // Check error message matches
});

// ==============================================================================
// TEST 4: Estimate Number and Components Properties
// ==============================================================================
/**
 * Purpose: Verify new properties added to the return object
 *
 * What it tests:
 * - estimateNumber property exists and is a number
 * - estimateNumber is greater than 1000 (the starting value)
 * - components property exists
 * - components property matches the input choices
 *
 * Why this matters: These properties are required by Task 2
 */
test("includes estimateNumber and components in return", () => {
  // Arrange: Set up test data
  const choices = {
    processor: "p3",
    ram: "16GB",
    storage: "1TB",
    screen: '19"',
    caseType: "Mini Tower",
    usbPorts: "2",
  };

  // Act: Call the function
  const result = calculateEstimate(choices);

  // Assert: Check that new properties exist
  expect(result).toHaveProperty("estimateNumber");
  expect(result).toHaveProperty("components");

  // Assert: Check estimateNumber is the right type and value
  // typeof checks the data type
  expect(typeof result.estimateNumber).toBe("number");

  // toBeGreaterThan checks that a number is larger than expected
  // Counter starts at 1000, so first estimate should be 1001+
  expect(result.estimateNumber).toBeGreaterThan(1000);

  // Assert: Check components match the input
  // toEqual does deep equality comparison for objects/arrays
  expect(result.components).toEqual(choices);
});

// ==============================================================================
// TEST 5: Unique Estimate Numbers
// ==============================================================================
/**
 * Purpose: Verify that each estimate gets a unique ID
 *
 * What it tests:
 * - Calling calculateEstimate multiple times produces different IDs
 * - IDs increment (each one is larger than the previous)
 *
 * Why this matters: Task 2 needs unique IDs to track orders
 *
 * How it works:
 * - Creates 3 estimates with the same choices
 * - Checks that all 3 have different estimate numbers
 * - Checks that numbers increase (1001, 1002, 1003, etc.)
 */
test("generates unique estimate numbers", () => {
  // Arrange: Set up test data (same choices for all 3 estimates)
  const choices = {
    processor: "p3",
    ram: "16GB",
    storage: "1TB",
    screen: '19"',
    caseType: "Mini Tower",
    usbPorts: "2",
  };

  // Act: Create 3 separate estimates
  const estimate1 = calculateEstimate(choices);
  const estimate2 = calculateEstimate(choices);
  const estimate3 = calculateEstimate(choices);

  // Assert: Each estimate should have a different number
  // not.toBe checks that values are NOT equal
  expect(estimate1.estimateNumber).not.toBe(estimate2.estimateNumber);
  expect(estimate2.estimateNumber).not.toBe(estimate3.estimateNumber);

  // Assert: Numbers should increase (counter increments)
  expect(estimate3.estimateNumber).toBeGreaterThan(estimate2.estimateNumber);
  expect(estimate2.estimateNumber).toBeGreaterThan(estimate1.estimateNumber);
});

// ==============================================================================
// TEST 6: All Component Prices Included
// ==============================================================================
/**
 * Purpose: Verify that ALL component prices are in the return object
 *
 * What it tests:
 * - componentPrices object has all 6 component types
 * - Each price matches the PRICES source of truth
 *
 * Why this matters: Ensures no component prices are missing
 * (Previous tests only checked processor and ram)
 */
test("includes prices for all component types", () => {
  // Arrange: Set up test data using all expensive options
  const choices = {
    processor: "p7",
    ram: "32GB",
    storage: "2TB",
    screen: '23"',
    caseType: "Midi Tower",
    usbPorts: "4",
  };

  // Act: Calculate estimate
  const result = calculateEstimate(choices);

  // Assert: Check that ALL component price properties exist
  expect(result.componentPrices).toHaveProperty("processor");
  expect(result.componentPrices).toHaveProperty("ram");
  expect(result.componentPrices).toHaveProperty("storage");
  expect(result.componentPrices).toHaveProperty("screen");
  expect(result.componentPrices).toHaveProperty("caseType");
  expect(result.componentPrices).toHaveProperty("usbPorts");

  // Assert: Verify each price matches PRICES data
  expect(result.componentPrices.processor).toBe(PRICES.processor.p7);
  expect(result.componentPrices.ram).toBe(PRICES.ram["32GB"]);
  expect(result.componentPrices.storage).toBe(PRICES.storage["2TB"]);
  expect(result.componentPrices.screen).toBe(PRICES.screen['23"']);
  expect(result.componentPrices.caseType).toBe(PRICES.caseType["Midi Tower"]);
  expect(result.componentPrices.usbPorts).toBe(PRICES.usbPorts["4"]);
});

// ==============================================================================
// TEST 7: Format Estimate Function
// ==============================================================================
/**
 * Purpose: Test the formatEstimate function that creates readable output
 *
 * What it tests:
 * - formatEstimate returns a formatted string
 * - String contains all required information
 * - Format matches the task specification
 *
 * Why this matters: This is how estimates will be displayed to users
 *
 * How it works:
 * - Creates a mock estimate object (not from calculateEstimate)
 * - Passes it to formatEstimate
 * - Checks that output contains all expected text
 */
test("formatEstimate produces correct output format", () => {
  // Arrange: Create a mock estimate object with known values
  const estimate = {
    estimateNumber: 1001,
    components: {
      processor: "p5",
      ram: "32GB",
      storage: "2TB",
      screen: '23"',
      caseType: "Midi Tower",
      usbPorts: "4",
    },
    componentPrices: {
      processor: 120,
      ram: 150,
      storage: 100,
      screen: 120,
      caseType: 70,
      usbPorts: 20,
    },
    subtotal: 580,
    totalWithMarkup: 696,
  };

  // Act: Format the estimate
  const formatted = formatEstimate(estimate);

  // Assert: Check that output contains all required information
  // toContain checks if a string includes a substring
  expect(formatted).toContain("Estimate Number: 1001");
  expect(formatted).toContain("Processor: p5 - $120");
  expect(formatted).toContain("RAM: 32GB - $150");
  expect(formatted).toContain("Storage: 2TB - $100");
  expect(formatted).toContain('Screen: 23" - $120');
  expect(formatted).toContain("Case: Midi Tower - $70");
  expect(formatted).toContain("USB ports: 4 ports - $20");
  expect(formatted).toContain("---");  // Separator line
  expect(formatted).toContain("Subtotal: $580");
  expect(formatted).toContain("Total (with 20% markup): $696");
});

// ==============================================================================
// TEST 8: Error Handling - Invalid RAM
// ==============================================================================
/**
 * Purpose: Verify error handling for invalid RAM choice
 *
 * What it tests:
 * - Function throws error when RAM size doesn't exist in PRICES
 *
 * Why this matters: Need to test error handling for each component type
 * (not just processor from Test 3)
 */
test("throws for invalid RAM choice", () => {
  expect(() =>
    calculateEstimate({
      processor: "p3",
      ram: "64GB",  // This RAM size doesn't exist in PRICES!
      storage: "1TB",
      screen: '19"',
      caseType: "Mini Tower",
      usbPorts: "2",
    })
  ).toThrow("Invalid component choice");
});

// ==============================================================================
// TEST 9: Error Handling - Invalid Storage
// ==============================================================================
/**
 * Purpose: Verify error handling for invalid storage choice
 *
 * What it tests:
 * - Function throws error when storage size doesn't exist in PRICES
 *
 * Why this matters: Comprehensive error handling coverage
 */
test("throws for invalid storage choice", () => {
  expect(() =>
    calculateEstimate({
      processor: "p3",
      ram: "16GB",
      storage: "4TB",  // This storage size doesn't exist in PRICES!
      screen: '19"',
      caseType: "Mini Tower",
      usbPorts: "2",
    })
  ).toThrow("Invalid component choice");
});

// ==============================================================================
// TEST 10: Error Handling - Invalid Screen
// ==============================================================================
/**
 * Purpose: Verify error handling for invalid screen choice
 *
 * What it tests:
 * - Function throws error when screen size doesn't exist in PRICES
 */
test("throws for invalid screen choice", () => {
  expect(() =>
    calculateEstimate({
      processor: "p3",
      ram: "16GB",
      storage: "1TB",
      screen: '27"',  // This screen size doesn't exist in PRICES!
      caseType: "Mini Tower",
      usbPorts: "2",
    })
  ).toThrow("Invalid component choice");
});
