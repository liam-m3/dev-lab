import { weeklyData } from "./weeklyData.js";

export function inputCow(day, cowId, morningYield, eveningYield) {
  const allCowIds = weeklyData.flatMap((day) =>
    day.milking.map((record) => record.cowId)
  );
    if (day < 0 || day > weeklyData.length - 1) {
    throw new Error("Invalid day index.");
  }
  if (cowId < 100 || cowId > 999) {
    throw new Error("Invalid cow id number.");
  }
  if (allCowIds.includes(cowId)) {
    throw new Error("Cow id already exists.");
  } else {
    return weeklyData[day].milking.push({ cowId, morningYield, eveningYield });
  }
  // TODO create a function that adds 2 numbers together
}

export function sumOfMilkYields() {
  const allMorningYields = weeklyData.flatMap((day) => {
    return day.milking.map((record) => record.morningYield)
  })
  const allEveningYields = weeklyData.flatMap((day) => {
    return day.milking.map((record) => record.eveningYield)
  })
  console.log(allMorningYields, allEveningYields) 
}

inputCow(1, 101, 10, 10)
inputCow(2, 102, 10, 10)
inputCow(3, 103, 10, 10)
sumOfMilkYields()