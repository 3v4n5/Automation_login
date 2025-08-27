const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: 'reports', // carpeta donde está tu cucumber-report.json
    reportPath: 'reports/html', // carpeta donde se generará el html
    metadata: {
        browser: {
            name: 'chromium',
            version: 'latest'
        },
        device: 'Local test machine',
        platform: {
            name: 'Windows',
            version: '11'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            { label: 'Project', value: 'Playwright + Cucumber' },
            { label: 'Release', value: '1.0.0' },
            { label: 'Execution Start Time', value: new Date().toISOString() }
        ]
    }
});
