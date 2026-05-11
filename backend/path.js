import path from 'path'
import { fileURLToPath } from 'url'

const fileUrl = import.meta.url
const filePath = fileURLToPath(fileUrl);
const __dirname = path.dirname(filePath);
console.log(fileUrl);
console.log(filePath);
console.log(__dirname);