import { PRICES } from "./prices.js";

let estimateCounter = 1000;
export function calculateEstimate(choices) {
  const processorPrice = PRICES.processor[choices.processor];
  const ramPrice = PRICES.ram[choices.ram];
  const storagePrice = PRICES.storage[choices.storage];
  const screenPrice = PRICES.screen[choices.screen];
  const casePrice = PRICES.caseType[choices.caseType];
  const usbPrice = PRICES.usbPorts[choices.usbPorts];

  if (
    processorPrice == null ||
    ramPrice == null ||
    storagePrice == null ||
    screenPrice == null ||
    casePrice == null ||
    usbPrice == null
  ) {
    throw new Error("Invalid component choice");
  }

  estimateCounter++;
  const estimateNumber = estimateCounter;

  const components = {
    processor: choices.processor,
    ram: choices.ram,
    storage: choices.storage,
    screen: choices.screen,
    caseType: choices.caseType,
    usbPorts: choices.usbPorts,
  };

  const componentPrices = {
    processor: processorPrice,
    ram: ramPrice,
    storage: storagePrice,
    screen: screenPrice,
    caseType: casePrice,
    usbPorts: usbPrice,
  };

  const subtotal =
    processorPrice +
    ramPrice +
    storagePrice +
    screenPrice +
    casePrice +
    usbPrice;

  const totalWithMarkup = +(subtotal * 1.2).toFixed(2);

  return {
    estimateNumber,
    components,
    componentPrices,
    subtotal,
    totalWithMarkup,
  };
}

export function formatEstimate(estimate) {
  return `
    Estimate Number: ${estimate.estimateNumber}
    Processor: ${estimate.components.processor} - $${estimate.componentPrices.processor}
    RAM: ${estimate.components.ram} - $${estimate.componentPrices.ram}
    Storage: ${estimate.components.storage} - $${estimate.componentPrices.storage}
    Screen: ${estimate.components.screen} - $${estimate.componentPrices.screen}
    Case: ${estimate.components.caseType} - $${estimate.componentPrices.caseType}
    USB ports: ${estimate.components.usbPorts} ports - $${estimate.componentPrices.usbPorts}
    ---
    Subtotal: $${estimate.subtotal}
    Total (with 20% markup): $${estimate.totalWithMarkup}`;
}
