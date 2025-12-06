const fs = require('fs');
const path = require('path');

// Use relative path from CWD
const filePath = 'src/components/admin/AdminDashboard.jsx';

try {
    const content = fs.readFileSync(filePath, 'utf8');

    let depth = 0;
    let line = 1;
    let column = 0;
    let inString = false;
    let stringChar = '';
    let inComment = false; // single line
    let inMultiComment = false;

    console.log('Starting brace check...');

    for (let i = 0; i < content.length; i++) {
        const char = content[i];

        // Track line/col
        if (char === '\n') {
            line++;
            column = 0;
            if (inComment) inComment = false;
        } else {
            column++;
        }

        // Skip comments
        if (inComment) continue;
        if (inMultiComment) {
            if (char === '*' && content[i + 1] === '/') {
                inMultiComment = false;
                i++;
                column++;
            }
            continue;
        }

        // Detect comments
        if (!inString && char === '/' && content[i + 1] === '/') {
            inComment = true;
            i++;
            column++;
            continue;
        }
        if (!inString && char === '/' && content[i + 1] === '*') {
            inMultiComment = true;
            i++;
            column++;
            continue;
        }

        // Handle strings
        if (inString) {
            if (char === stringChar && content[i - 1] !== '\\') {
                inString = false;
            }
            continue;
        }
        if (char === '"' || char === '\'' || char === '`') {
            inString = true;
            stringChar = char;
            continue;
        }

        // Count braces
        if (char === '{') {
            depth++;
        } else if (char === '}') {
            depth--;
            if (depth === 0) {
                console.log(`Depth dropped to 0 at Line ${line}, Column ${column}`);
                // Print context
                const start = Math.max(0, i - 50);
                const end = Math.min(content.length, i + 50);
                console.log('Context:', content.substring(start, end).replace(/\n/g, '\\n'));
                // Don't break, keep checking if there are more
            }
            if (depth < 0) {
                console.error(`Depth became negative at Line ${line}, Column ${column}`);
                break;
            }
        }
    }

    console.log(`Final depth: ${depth}`);

} catch (err) {
    console.error('Error reading file:', err);
}
