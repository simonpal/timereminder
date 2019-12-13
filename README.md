# timeReminder

## Installation

```bash
npm install
```

# Development
Make sure src/electron.ts is set to load index.html is loaded directly:

```bash
win.loadFile('index.html');
```

# Production
Set index.html in src/electron.ts to load from dist/index.html

```bash
win.loadFile('dist/index.html');
```


