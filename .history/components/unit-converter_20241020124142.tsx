"use client"; // Enables client-side rendering for this component

import { useState, ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

// Conversion rates for various units categorized by length, weight, and volume
const conversionRates: Record<string, Record<string, number>> = {
  length: {
    "Millimeters (mm)": 1,
    "Centimeters (cm)": 10,
    "Meters (m)": 1000,
    "Kilometers (km)": 1000000,
    "Inches (in)": 25.4,
    "Feet (ft)": 304.8,
    "Yards (yd)": 914.4,
    "Miles (mi)": 1609344,
  },
  weight: {
    "Grams (g)": 1,
    "Kilograms (kg)": 1000,
    "Ounces (oz)": 28.3495,
    "Pounds (lb)": 453.592,
  },
  volume: {
    "Milliliters (ml)": 1,
    "Liters (l)": 1000,
    "Fluid Ounces (fl oz)": 29.5735,
    "Cups (cup)": 240,
    "Pints (pt)": 473.176,
    "Quarts (qt)": 946.353,
    "Gallons (gal)": 3785.41,
  },
};

// Unit types categorized by length, weight, and volume
const unitTypes: Record<string, string[]> = {
  length: [
    "Millimeters (mm)",
    "Centimeters (cm)",
    "Meters (m)",
    "Kilometers (km)",
    "Inches (in)",
    "Feet (ft)",
    "Yards (yd)",
    "Miles (mi)",
  ],
  weight: ["Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lb)"],
  volume: [
    "Milliliters (ml)",
    "Liters (l)",
    "Fluid Ounces (fl oz)",
    "Cups (cup)",
    "Pints (pt)",
    "Quarts (qt)",
    "Gallons (gal)",
  ],
};

// Default export of the UnitConverterComponent function
export default function UnitConverterComponent() {
  // State hooks for managing input value, selected units, and the converted value
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [inputUnit, setInputUnit] = useState<string | null>(null);
  const [outputUnit, setOutputUnit] = useState<string | null>(null);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(parseFloat(e.target.value));
  };

  const handleInputUnitChange = (value: string): void => {
    setInputUnit(value);
  };

  const handleOutputUnitChange = (value: string): void => {
    setOutputUnit(value);
  };

  const convertValue = (): void => {
    if (inputValue !== null && inputUnit && outputUnit) {
      let unitCategory: string | null = null;

      for (const category in unitTypes) {
        if (
          unitTypes[category].includes(inputUnit) &&
          unitTypes[category].includes(outputUnit)
        ) {
          unitCategory = category;
          break;
        }
      }

      if (unitCategory) {
        const baseValue = inputValue * conversionRates[unitCategory][inputUnit];
        const result = baseValue / conversionRates[unitCategory][outputUnit];
        setConvertedValue(result);
      } else {
        setConvertedValue(null);
        alert("Incompatible unit types selected.");
      }
    } else {
      setConvertedValue(null);
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <Card className="w-full max-w-md mx-auto bg-gray-800 border border-gray-600 shadow-lg hover:border-blue-500 hover:shadow-xl transition-all duration-300 ease-in-out rounded-lg p-6">
        <CardHeader className="text-center border-b border-gray-700 pb-4 mb-4">
        <CardTitle className="text-4xl font-extrabold">
  <span className="text-red-500">Unit</span> 
  {" "}
  <span className="text-blue-500">Converter</span>
</CardTitle>

          <CardDescription className="text-gray-400">
            Convert values between different units.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Select for input unit */}
          <div className="grid gap-2">
            <Label htmlFor="input-unit" className="text-gray-300">From</Label>
            <Select onValueChange={handleInputUnitChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitTypes).map(([category, units]) => (
                  <SelectGroup key={category}>
                    <SelectLabel>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectLabel>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Select for output unit */}
          <div className="grid gap-2">
            <Label htmlFor="output-unit" className="text-gray-300">To</Label>
            <Select onValueChange={handleOutputUnitChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitTypes).map(([category, units]) => (
                  <SelectGroup key={category}>
                    <SelectLabel>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectLabel>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Input for value to convert */}
          <div className="grid gap-2">
            <Label htmlFor="input-value" className="text-gray-300">Value</Label>
            <Input
              id="input-value"
              type="number"
              placeholder="Enter value"
              value={inputValue || ""}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 transition"
            />
          </div>
          {/* Button to trigger conversion */}
          <Button
            type="button"
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-2 rounded-lg shadow-lg hover:shadow-pink-600/50 hover:bg-gradient-to-l transition-all ease-in-out duration-300"
            onClick={convertValue}
          >
            Convert
          </Button>
        </CardContent>
        {/* Display the converted value */}
        <div className="mt-6 text-center">
          <div className="text-4xl font-bold text-indigo-400">
            {convertedValue !== null ? convertedValue.toFixed(2) : "0"}
          </div>
          <div className="text-gray-400">
            {outputUnit ? outputUnit : "Unit"}
          </div>
        </div>
      </Card>
      <div className="mt-6 text-center text-gray-400 font-semibold">
        Generated by Asadullah Shafique
      </div>
    </div>
  );
}