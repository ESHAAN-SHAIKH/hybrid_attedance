const fs = require('fs');

try {
    const content = fs.readFileSync('src/components/admin/AdminDashboard.jsx', 'utf8');
    const lines = content.split('\n');

    let balance = 0;
    let componentStarted = false;

    for (let i = 0; i < 900; i++) {
        const line = lines[i];
        if (!line) continue;

        if (line.includes('const AdminDashboard = () => {')) {
            componentStarted = true;
        }

        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '{') {
                balance++;
            } else if (char === '}') {
                balance--;
            }
        }

        if (componentStarted && balance === 0 && i > 20) {
            console.log(`POTENTIAL ERROR: AdminDashboard closed at line ${i + 1}`);
            console.log(`Line content: ${line}`);
            process.exit(0);
        }
        if (balance < 0) {
            console.log(`FATAL ERROR: Balance negative at line ${i + 1}`);
            process.exit(1);
        }
    }

    console.log('Balance at line 900:', balance);

} catch (e) {
    console.error(e);
}
