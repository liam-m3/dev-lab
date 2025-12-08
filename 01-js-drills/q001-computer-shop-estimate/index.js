const PRICES = {
  processor: {
    p3: 100,
    p5: 120,
    p7: 200,
  },
  ram: {
    "16GB": 75,
    "32GB": 150,
  },
  storage: {
    "1TB": 50,
    "2TB": 100,
  },
  screen: {
    '19"': 65,
    '23"': 120,
  },
  caseType: {
    "Mini Tower": 40,
    "Midi Tower": 70,
  },
  usbPorts: {
    "2": 10,
    "4": 20,
  },
};

/**
 * 
 * @param {Object} choices
 * @param {"p3"|"p5"|"p7"} choices.processor
 * @param {"16GB"|"32GB"} choices.ram
 * @param {"1TB"|"2TB"} choices.storage
 * @param {'19"'|'23"'} choices.screen
 * @param {"Mini Tower"|"Midi Tower"} choices.caseType
 * @param {"2"|"4"} choices.usbPorts  // number of ports as string for simplicity
 *
 * @returns {{
 *   componentPrices: {
 *     processor: number,
 *     ram: number,
 *     storage: number,
 *     screen: number,
 *     caseType: number,
 *     usbPorts: number
 *   },
 *   subtotal: number,
 *   totalWithMarkup: number
 * }}
 */

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

  return { componentPrices, subtotal, totalWithMarkup };
}
