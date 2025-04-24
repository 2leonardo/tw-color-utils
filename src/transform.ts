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

const getOutput = (
    data: ThemeData
): { cssOutput: string; indexOutput: string } => {
    const tempPrimitiveValues: { [key: string]: string } = {};
    let cssOutput = '';
    let indexOutput = '';
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
    indexOutput += 'export const tokens = {\n';
    for (const [name, reference] of Object.entries(data.semantic)) {
        const colorValue = tempPrimitiveValues[reference];
        const hasDash = name.includes('-');
        const key = hasDash ? `'${name}'` : name;
        //* Tailwind css output
        cssOutput += `${sp}--color-${name}: ${colorValue};`;
        cssOutput += ` /* ${reference} */\n`;
        //* Index.js output
        indexOutput += `${sp}${key}: '${colorValue}',\n`;
    }
    cssOutput += `}\n`;
    indexOutput += `};\n`;

    return {
        cssOutput,
        indexOutput,
    };
};

const transform = (data: ThemeData): void => {
    const { cssOutput, indexOutput } = getOutput(data);
    fs.writeFileSync('theme.css', cssOutput);
    fs.writeFileSync('index.js', indexOutput);
    console.log('Theme generated');
};

export default transform;
