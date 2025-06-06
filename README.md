# Webpack Template

A template for quickly setting up webpack projects with common configurations.

## Features

- Webpack 5
- Development & Production configs
- Asset Resource Loader
- SCSS Loader
- CSS Loader
- HTML Loader
- Source Maps
- Development Server
- Clean Build Directory

## Setup

1. Clone this repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
npm install
```

## Usage

### Development server

```bash
npm start
```

This will run the development server at `localhost:8080` with hot reloading.

### Production build

```bash
npm run build
```

This will create a production build in the `dist` directory.

## Project Structure

```
webpack-template/
├── config/                 # Webpack configurations
│   ├── webpack.common.js   # Shared config
│   ├── webpack.dev.js     # Development config
│   └── webpack.prod.js    # Production config
├── src/                    # Source files
│   ├── assets/            # Assets
│   │   ├── images/        # Images
│   │   └── fonts/         # Fonts
│   ├── scripts/           # JavaScript
│   ├── styles/            # CSS
│   └── template.html      # HTML template
└── package.json           # Project meta and dependencies
```

## License

ISC
