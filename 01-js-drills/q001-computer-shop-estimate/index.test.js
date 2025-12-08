import { calculateEstimate } from "./index.js";

test("calculates estimate for a basic p3, 16GB, 1TB, 19\", Mini, 2 USB build", () => {
  const result = calculateEstimate({
    processor: "p3",
    ram: "16GB",
    storage: "1TB",
    screen: '19"',
    caseType: "Mini Tower",
    usbPorts: "2",
  });

  expect(result.subtotal).toBe(340);
  expect(result.totalWithMarkup).toBe(408);

  expect(result.componentPrices).toEqual({
    processor: 100,
    ram: 75,
    storage: 50,
    screen: 65,
    caseType: 40,
    usbPorts: 10,
  });
});

test("calculates estimate for a high-end p7, 32GB, 2TB, 23\", Midi, 4 USB build", () => {
  const result = calculateEstimate({
    processor: "p7",
    ram: "32GB",
    storage: "2TB",
    screen: '23"',
    caseType: "Midi Tower",
    usbPorts: "4",
  });

  expect(result.subtotal).toBe(660);
  expect(result.totalWithMarkup).toBe(792); 
});

test("throws if an invalid choice is provided", () => {
  expect(() =>
    calculateEstimate({
      processor: "p9", // invalid
      ram: "16GB",
      storage: "1TB",
      screen: '19"',
      caseType: "Mini Tower",
      usbPorts: "2",
    }),
  ).toThrow("Invalid component choice");
});
