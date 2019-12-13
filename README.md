# timeReminder

## Installation

```bash
npm install
```

## Development
Make sure src/electron.ts is set to load index.html (win.loadFile('index.html');)

```bash
npm start
```

## Production
Set index.html in src/electron.ts to load from dist/index.html (win.loadFile('dist/index.html');)

```bash
npm run build
npm run dist
```


