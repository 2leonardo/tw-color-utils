import { transform } from '../index.js';

import primitive from './primitive.js';
import semantic from './semantic.js';

const data = {
    primitive,
    semantic,
};

transform(data);
