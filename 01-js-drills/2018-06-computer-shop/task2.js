import { PRICES } from "./prices.js";
import { calculateEstimate } from "./task1.js";

const stock = {
  processor: 10,
  ram: 10,
  storage: 10,
  screen: 10,
  caseType: 10,
  usbPorts: 10,
};

const orderList = []

export function getStock(componentType) {
  return stock[componentType];
}

export function updateStock(componentType) {
  if (stock[componentType] <= 0) {
    throw new Error(`${componentType} is out of stock.`);
  } else {
    stock[componentType] -= 1;
  }
}

export function placeOrder(estimate, customerName, customerContact) {
  const componentTypes = [
    "processor",
    "ram",
    "storage",
    "screen",
    "caseType",
    "usbPorts",
  ];
  for (const type of componentTypes) {
    if (getStock(type) <= 0) {
      throw new Error(`Cannot place order: ${type} is out of stock`);
    }
  }
  componentTypes.forEach((type) => {
    updateStock(type);
  });
  const order = {
    estimateNumber: estimate.estimateNumber,
    components: estimate.components,
    componentPrices: estimate.componentPrices,
    subtotal: estimate.subtotal,
    totalWithMarkup: estimate.totalWithMarkup,
    customerName,
    customerContact,
    orderDate: new Date().toLocaleDateString(),
  };

  orderList.push(order)

  return order;
}
