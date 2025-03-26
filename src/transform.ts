import fs from 'fs';

interface PrimitiveValues {
    [key: string]: { value: string };
}

interface Primitive {
    [category: string]: PrimitiveValues;
}

interface SemanticValues {
    [key: string]: string;
}

interface Semantic {
    [category: string]: SemanticValues;
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
    for (const category in data.semantic) {
        for (const [name, value] of Object.entries(data.semantic[category])) {
            cssOutput += `${sp}--color-${category}-${name}: var(--${value}); /* ${tempPrimitiveValues[value]} */\n`;
        }
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
