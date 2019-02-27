# Modernboard UI
This project is a material design front-end for [ModernBoard](https://github.com/noamdb/modernboard).

## Configuration
Set the url in the environments folder to match url of your ModernBorad API.

## Deployment
Use [Netlify](https://www.netlify.com) to deploy the front-end for free.

## Build
Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Internationalization
You can add support for your language using [Angular i18n](https://angular.io/guide/i18n)

run "ng xi18n --output-path locale" to generate transltion file  
Rename the file messages.xlf to match your language (e.g - messages.he.xlf)  
Add command in package.json similar to "build-he" and change "he" to match your language  
deploy using "npm run build-i18n:he"

