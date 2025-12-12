# Computer Shop Program - Task Breakdown

## Overview

A computer shop builds custom computers from components. The program needs to:

1. Produce cost estimates
2. Check stock and place orders
3. Provide daily order summaries

---

## TASK 1 – Produce an Estimate

### What to implement

- **Input**: Customer choices for each component
- **Process**: Calculate total cost
- **Output**: Estimate with details

### Component Options

| Component | Choices | Prices ($) |
|-----------|---------|------------|
| Processor | p3 / p5 / p7 | 100 / 120 / 200 |
| RAM | 16 GB / 32 GB | 75 / 150 |
| Storage | 1 TB / 2 TB | 50 / 100 |
| Screen | 19" / 23" | 65 / 120 |
| Case | Mini Tower / Midi Tower | 40 / 70 |
| USB ports | 2 ports / 4 ports | 10 / 20 |

### Requirements

1. Generate a **unique estimate number**
2. Display:
   - The estimate number
   - Each component chosen
   - Price of each component
   - **Total cost** = (sum of components) + 20%

### Example Output

```md
Estimate Number: 1001
Processor: p5 - $120
RAM: 32 GB - $150
Storage: 2 TB - $100
Screen: 23" - $120
Case: Midi Tower - $70
USB ports: 4 ports - $20
---
Subtotal: $580
Total (with 20% markup): $696
```

---

## TASK 2 – Place an Order

### What to implement 

- **Input**: Use estimate from Task 1
- **Process**:
  1. Check if ALL components are in stock
  2. If yes: update stock levels
  3. Add estimate number to order list
  4. Get customer details
  5. Add today's date
- **Output**: Print 2 copies of the order (customer + shop)

### Requirements 

1. **Stock checking**: Verify each component is available
2. **Stock updating**: Reduce quantities for ordered components
3. **Order tracking**: Maintain list of order numbers
4. **Customer information**: Collect and store:
   - Customer name
   - Customer contact details
   - Order date
5. **Order output**: Generate complete order document

### Logic Flow 

```md
1. Get estimate from Task 1
2. Check stock for each component
3. IF all components in stock THEN
     - Update stock levels (subtract quantities)
     - Add estimate number to orders list
     - Add current date
     - Print order (x2)
   ELSE
     - Display which components are out of stock
     - Do not process order
```

---

## TASK 3 – Summarise the Day's Orders

### What to implement 

- **Extension of Task 2**
- **Process**: Track all orders throughout the day
- **Output**: End-of-day summary report

### Requirements

Display:

1. **Total number of orders** made today
2. **Count of each component type sold**, e.g.:
   - p3 processors: 5
   - p5 processors: 12
   - p7 processors: 3
   - 16 GB RAM: 8
   - 32 GB RAM: 12
   - etc.
3. **Total value of all orders** (sum of all order totals)

### Example Output

```md
=== Daily Summary ===
Date: 10/06/2018

Total Orders: 15

Components Sold:
- Processors:
  * p3: 4
  * p5: 8
  * p7: 3
- RAM:
  * 16 GB: 6
  * 32 GB: 9
- Storage:
  * 1 TB: 10
  * 2 TB: 5
- Screen:
  * 19": 7
  * 23": 8
- Case:
  * Mini Tower: 9
  * Midi Tower: 6
- USB:
  * 2 ports: 5
  * 4 ports: 10

Total Revenue: $9,840
```

---

## Implementation Notes

### General Requirements

- ✅ Appropriate prompts for data entry
- ✅ Clear error messages and output
- ✅ Meaningful variable/constant names
- ✅ Full testing of each task

### Data Structures Needed

1. **Estimate**: Store estimate number, components, prices
2. **Stock**: Track inventory levels for each component
3. **Orders**: List of order numbers
4. **Customer**: Name, contact, date
5. **Daily totals**: Counters for each component, running total

### Testing

- Test each task fully before moving to the next
- Test boundary cases (stock = 0, stock = 1)
- Test invalid inputs
- Test the 20% calculation
- Test unique estimate number generation
