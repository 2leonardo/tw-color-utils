type Values = {
    [key: string]: string;
};

type Result = {
    [key: string]: {
        value: string;
        name: string;
    };
};

const generatePrimitive = (category: string, values: Values) => {
    const result: Result = {};
    for (const [key, value] of Object.entries(values)) {
        result[key] = { value, name: `${category}-${key}` };
    }
    return result;
};

export default generatePrimitive;
