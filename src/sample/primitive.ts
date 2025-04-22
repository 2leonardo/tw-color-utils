import { generatePrimitive } from '../index.js';

interface PrimitiveValues {
    [key: string]: {
        value: string;
    };
}
interface Primitive {
    [category: string]: PrimitiveValues;
}

const primitive: Primitive = {
    neutral: generatePrimitive('neutral', {
        100: 'oklch(0% 0 0)',
        90: 'oklch(25.2% 0 0)',
        80: 'oklch(45.3% 0.028 246.5)',
        70: 'oklch(53.6% 0.041 248.6)',
        60: 'oklch(66.8% 0.026 254)',
        50: 'oklch(85.4% 0.018 253.4)',
        40: 'oklch(93.7% 0.013 233.7)',
        20: 'oklch(97% 0.008 236.6)',
        0: 'oklch(100% 0 0)',
    }),
};

export default primitive;
