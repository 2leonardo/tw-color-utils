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
    let cssOutput = '';
    const sp = '    ';

    cssOutput += `:root {\n`;
    for (const category in data.primitive) {
        for (const [name, values] of Object.entries(data.primitive[category])) {
            cssOutput += `${sp}--${category}-${name}: ${values.value};\n`;
        }
    }
    cssOutput += `}\n\n`;

    cssOutput += `@theme inline {\n`;
    for (const category in data.semantic) {
        for (const [name, value] of Object.entries(data.semantic[category])) {
            cssOutput += `${sp}--color-${category}-${name}: var(--${value});\n`;
        }
    }
    cssOutput += `}\n`;
    return cssOutput;
};

const transform = (data: ThemeData): void => {
    const output = getOutput(data);
    fs.writeFileSync('theme.css', output);
    console.log('theme generated');
};

export default transform;
