# Q001 – Computer shop estimate

Original idea:
A computer shop builds custom computers from components. For each request, an estimate is produced based on the customer’s choices:

Component  Choices            Prices in $
Processor  p3 / p5 / p7       100 / 120 / 200
RAM        16GB / 32GB        75 / 150
Storage    1TB / 2TB          50 / 100
Screen     19" / 23"          65 / 120
Case       Mini / Midi        40 / 70
USB ports  2 ports / 4 ports  10 / 20

The estimate must show the components chosen, the price of each, and the total cost of the computer, calculated as the sum of component prices plus 20%.

My js version:
Create a function that takes the chosen option for each component and returns:
- the price of each component
- the subtotal (sum of component prices)
- the final total (subtotal + 20%)

We are **only** modelling Task 1 (estimate calculation), not stock or end-of-day summary.
