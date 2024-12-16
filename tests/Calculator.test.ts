import { describe, it, expect } from 'vitest';
import CalculationTool from '../src/Calculator';
import { promises } from 'fs';

describe('CalculationTool', () => {
    const calc = new CalculationTool();

    it('should correctly add multiple numbers', () => {
        const testCases = [
            { input: [1, 2, 3, 4], expected: 10 },
            { input: [5], expected: 5 },
            { input: [], expected: 0 }
        ];
        testCases.forEach(({ input, expected }) => {
            expect(calc.sum(...input)).toBe(expected);
        });
    });

    it('should correctly subtract two numbers', () => {
        const testCases = [
            { numOne: 10, numTwo: 5, expected: 5 },
            { numOne: 5, numTwo: 10, expected: -5 }
        ];
        testCases.forEach(({ numOne, numTwo, expected }) => {
            expect(calc.subduct(numOne, numTwo)).toBe(expected);
        });
    });

    it('should correctly multiply multiple numbers', () => {
        const testCases = [
            { input: [2, 3, 4], expected: 24 },
            { input: [], expected: 1 },
            { input: [5], expected: 5 }
        ];
        testCases.forEach(({ input, expected }) => {
            expect(calc.multiply(...input)).toBe(expected);
        });
    });

    it('should correctly divide two numbers', () => {
        const testCases = [
            { numOne: 10, numTwo: 2, expected: 5 },
            { numOne: -10, numTwo: 2, expected: -5 },
            { numOne: 10, numTwo: 0.5, expected: 20 }
        ];
        testCases.forEach(({ numOne, numTwo, expected }) => {
            expect(calc.divide(numOne, numTwo)).toBe(expected);
        });
    });

    it('should throw an error when dividing by zero', () => {
        expect(() => calc.divide(10, 0)).toThrow("Cannot divide by zero");
    });

    it('should sum numbers from a file', async () => {
        const filePath = './tests/temp.txt';
        await promises.writeFile(filePath, '1 2 3 4');
        const result = await calc.sumFromFile(filePath);
        expect(result).toBe(10);
        await promises.unlink(filePath);
    });

    it('should throw an error if file contains non-numeric values', async () => {
        const filePath = './tests/temp_invalid.txt';
        await promises.writeFile(filePath, '1 2 three 4');
        await expect(calc.sumFromFile(filePath)).rejects.toThrow("Error reading file or invalid file format");
        await promises.unlink(filePath);
    });

    it('should throw an error if file cannot be read', async () => {
        await expect(calc.sumFromFile('./tests/non_existent_file.txt')).rejects.toThrow("Error reading file or invalid file format");
    });

    it('should write result to file', async () => {
        const filePath = './tests/output.txt';
        await CalculationTool.writeToFile(filePath, 42);
        const content = await promises.readFile(filePath, 'utf-8');
        expect(content).toBe('Result: 42');
        await promises.unlink(filePath);
    });
});
