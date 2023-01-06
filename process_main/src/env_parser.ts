import * as os from 'os';
import * as fs from 'fs';

import { ENV_PATH } from "./params";

const lines = fs.readFileSync(ENV_PATH, {encoding:'utf-8',flag:'r'}).split(os.EOL)

lines.forEach(line => {
  console.log('**',line);
});