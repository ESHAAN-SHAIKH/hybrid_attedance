const fs = require('fs');

const content = fs.readFileSync('src/components/admin/AdminDashboard.jsx', 'utf8');
const lines = content.split('\n');

let balance = 0;
let stack = [];

for (let i = 0; i < 1000; i++) {
    const line = lines[i];
    if (!line) break;

    for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '{') {
            balance++;
            stack.push(i + 1);
        } else if (char === '}') {
            balance--;
            if (balance < 0) {
                console.log(`Unbalanced closing brace at line ${i + 1}, column ${j + 1}`);
                process.exit(1);
            }
            stack.pop();
        }
    }
}

console.log('Balance at line 1000:', balance);
if (stack.length > 0) {
    console.log('Unclosed braces at lines:', stack.slice(-5));
}
