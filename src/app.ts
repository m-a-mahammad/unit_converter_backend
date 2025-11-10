import express, { type Request, type Response } from "express";
import cors from "cors";
import { temperature, toMilligram, toMillimeter, units } from "./constants.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("This is a unit converting app");
});

app.post("/submit", (req, res) => {
  const { length, fromUnit, toUnit } = req.body;

  let convert: (value: string, from: any, to: any) => void = () => {};
  if (Object.keys(toMillimeter).includes(fromUnit)) {
    type LengthUnit = keyof typeof toMillimeter;
    convert = function (value: string, from: LengthUnit, to: LengthUnit) {
      const mm = Number(value) * toMillimeter[from];
      return mm / toMillimeter[to];
    };
  } else if (Object.keys(toMilligram).includes(fromUnit)) {
    type WeightUnit = keyof typeof toMilligram;
    convert = function (value: string, from: WeightUnit, to: WeightUnit) {
      const mg = Number(value) * toMilligram[from];
      return mg / toMilligram[to];
    };
  } else if (Object.values(temperature).includes(fromUnit)) {
    if (toUnit === temperature.celsius) {
      if (fromUnit === temperature.fahrenheit) {
        convert = () => ((length - 32) * 5) / 9;
      } else if (fromUnit === temperature.kelvin) {
        convert = () => length - 273.15;
      } else {
        convert = () => length;
      }
    } else if (toUnit === temperature.fahrenheit) {
      if (fromUnit === temperature.celsius) {
        convert = () => (length * 9) / 5 + 32;
      } else if (fromUnit === temperature.kelvin) {
        convert = () => ((length - 273.15) * 9) / 5 + 32;
      } else {
        convert = () => length;
      }
    } else if (toUnit === temperature.kelvin) {
      if (fromUnit === temperature.celsius) {
        convert = () => length + 273.15;
      } else if (fromUnit === temperature.fahrenheit) {
        convert = () => ((length - 32) * 5) / 9 + 273.15;
      } else {
        convert = () => length;
      }
    }
  }

  res.send({
    result: convert(length, fromUnit, toUnit),
    resultUnit: units[`${toUnit as keyof typeof units}`],
    lengthUnit: units[`${fromUnit as keyof typeof units}`],
  });
});

app.listen(3000, () => {
  console.log(`server is listening on port 3000`);
});
