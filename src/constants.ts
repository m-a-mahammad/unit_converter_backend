export const toMillimeter = {
  millimeter: 1,
  centimeter: 10,
  meter: 1000,
  kilometer: 1_000_000,
  inch: 25.4,
  foot: 304.8,
  yard: 914.4,
  mile: 1_609_344,
} as const;

export const toMilligram = {
  milligram: 1,
  gram: 1_000,
  kilogram: 1_000_000,
  ounce: 28_349.5,
  pound: 453_592.37,
} as const;

export enum temperature {
  celsius = "celsius",
  fahrenheit = "fahrenheit",
  kelvin = "kelvin",
}

export enum units {
  millimeter = "mm",
  centimeter = "cm",
  meter = "m",
  kilometer = "km",
  inch = "in",
  foot = "ft",
  yard = "yd",
  mile = "mi",
  milligram = "mg",
  gram = "g",
  kilogram = "kg",
  ounce = "oz",
  pound = "lb",
  celsius = "°C",
  fahrenheit = "°F",
  kelvin = "K",
}
