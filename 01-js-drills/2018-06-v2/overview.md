# Computer Science 0478/22 - Tasks 1-3 Overview

## Context

You need to create a program for a farmer to track milk production from a herd of cows.

### Key Information:

- Each cow has a **unique 3-digit identity code**
- Each cow is milked **twice a day, seven days a week** (14 times per week)
- Milk volume (yield) is recorded in **litres to 1 decimal place**
- Herd size is **fixed**

## TASK 1 – Record the Yield

### What You Need to Do:

Write a program that records and stores milk yield data for an entire week.

### Requirements:

- **Input:** Identity code (3 digits) and yield (litres, 1 decimal place) for each milking session
- **Storage:** Store all the data (identity codes and yields) for the entire week
- **Validation:** Ensure each 3-digit identity code is **unique**
- Include appropriate prompts for data entry
- Use meaningful variable names

### Data Structure Considerations:

You'll need to store:

- Multiple cows' data
- Multiple milking sessions per cow (14 per week)
- Identity codes and yields together

**Suggested approach:** Use a 2D array or list of records/dictionaries to store cow IDs and their daily yields.

## TASK 2 – Calculate the Statistics

### What You Need to Do:

Using the data from Task 1, calculate and display:

1. **Total weekly volume of milk for the entire herd** (rounded to nearest whole litre)
2. **Average yield per cow for the week** (rounded to nearest whole litre)

### Requirements:

- Read the stored data from Task 1
- Sum all milk yields across all cows
- Calculate average by dividing total by number of cows
- Display results clearly
- Round to nearest whole litre

### Algorithm Steps:

1. Initialize total to 0
2. Loop through all cows
3. For each cow, sum their weekly yields
4. Add to herd total
5. Calculate average = total ÷ number of cows
6. Display results

## TASK 3 – Identify High and Low Producers

### What You Need to Do:

Extend Task 2 to identify:

1. **The cow with the highest weekly yield**
   - Display identity code and total weekly yield

2. **Cows producing less than 12 litres on 4+ days**
   - Display identity codes of these cows

### Requirements for Best Cow:

- Track the maximum weekly total
- Keep record of which cow produced it
- Display cow ID and yield amount

### Requirements for Low-Producing Cows:

- For each cow, count how many days they produced less than 12 litres
- If count ≥ 4 days, flag that cow
- Display all flagged cow identity codes

### Algorithm Considerations:

- Need to track daily yields (not just weekly totals) to count low-production days
- A "day" means checking both morning and evening milkings
- Less than 12 litres could mean:
  - Single milking < 12 litres, OR
  - Total for both milkings in a day < 12 litres
  (Clarify which interpretation to use)

## Important Programming Requirements

### For All Tasks:

✓ Use **meaningful names** for variables, constants, and identifiers  
✓ Include **appropriate prompts** for data entry  
✓ Display **clear error messages** and output  
✓ **Fully test** each task before moving to the next  

### Variable Naming Examples:

- `cowID` or `identityCode` (not `x` or `num`)
- `milkYield` or `dailyYield` (not `y` or `value`)
- `totalWeeklyMilk` (not `total`)
- `averageYieldPerCow` (not `avg`)

### Data Validation:

- Identity codes must be exactly 3 digits
- Identity codes must be unique
- Yields must be positive numbers with 1 decimal place

## Testing Strategy

### Test Data Should Include:

- **Normal data:** Valid codes (e.g., 101, 250, 999) and typical yields (e.g., 15.5, 20.3)
- **Boundary data:** Edge cases (e.g., 100, 999, 0.0, 99.9 litres)
- **Abnormal data:** Invalid inputs (e.g., 99, 1000, -5.0, "ABC")
- **Extreme data:** Very high/low yields, edge of specifications

### Specific Test Cases:

1. Cow with consistent high yield (should be identified as best)
2. Cow with 4+ days below 12 litres (should be flagged)
3. Cow with exactly 3 days below 12 litres (should NOT be flagged)
4. Duplicate identity code (should be rejected)

## Question 1 Requirements (Exam Questions)

You'll need to answer questions about your program:

### 1(a)(i) - Variables in Task 2

Name two variables with their data type and purpose

### 1(a)(ii) - Data Structures

Describe how you stored the cow data with examples

### 1(b) - Unique Identity Codes

Explain your validation method

### 1(c) - Algorithm for Task 2

Write pseudocode/flowchart for calculating statistics

### 1(d)(i) - Finding Low-Yield Cows

Explain the logic for identifying cows with <12 litres on 4+ days

### 1(d)(ii) - Storing Low-Yield Cow IDs

Explain how to store the identity codes of flagged cows

## Summary Checklist

- [ ] Task 1: Records all yields with unique IDs
- [ ] Task 2: Calculates total and average (rounded)
- [ ] Task 3: Finds best cow and low producers
- [ ] All variables have meaningful names
- [ ] Clear prompts and output messages
- [ ] Validation for 3-digit unique codes
- [ ] Full testing completed
- [ ] Can explain your algorithms and data structures