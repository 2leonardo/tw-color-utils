import fs from 'fs';

interface PrimitiveValues {
    [key: string]: { value: string };
}

interface Primitive {
    [category: string]: PrimitiveValues;
}

interface Semantic {
    [name: string]: string;
}

interface ThemeData {
    primitive: Primitive;
    semantic: Semantic;
}

const getOutput = (data: ThemeData): string => {
    const tempPrimitiveValues: { [key: string]: string } = {};
    let cssOutput = '';
    const sp = '    ';

    cssOutput += `:root {\n`;
    for (const category in data.primitive) {
        for (const [name, values] of Object.entries(data.primitive[category])) {
            cssOutput += `${sp}--${category}-${name}: ${values.value};\n`;
            tempPrimitiveValues[`${category}-${name}`] = values.value;
        }
    }
    cssOutput += `}\n\n`;

    cssOutput += `@theme inline {\n`;
    for (const [name, reference] of Object.entries(data.semantic)) {
        cssOutput += `${sp}--color-${name}: ${tempPrimitiveValues[reference]};\n`;
    }
    cssOutput += `}\n`;
    return cssOutput;
};

const transform = (data: ThemeData): void => {
    const output = getOutput(data);
    fs.writeFileSync('theme.css', output);
    console.log('Theme generated');
};

export default transform;
