import circumference from "../Utils/circumference.js";
import { test, expect } from "@jest/globals"

test('Circumference of a circle having radius of 3 to be 18',() => {
        expect(circumference(3)).toBe(18)
    })