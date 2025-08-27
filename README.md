# 🧪 Automatización de Login con Playwright, Cucumber y TypeScript

Este proyecto implementa pruebas automatizadas para la funcionalidad de login utilizando:

- [Playwright](https://playwright.dev/) para la automatización del navegador
- [Cucumber](https://cucumber.io/) con Gherkin para pruebas basadas en comportamiento (BDD)
- [TypeScript](https://www.typescriptlang.org/) como lenguaje de desarrollo
- [dotenv](https://www.npmjs.com/package/dotenv) para la gestión de variables de entorno

## 📦 Requisitos

- Node.js v18 o superior
- npm o yarn
- Git

## 🚀 Instalación

git clone https://github.com/3v4n5/Automation_login.git
cd Automation_login

## Instala las dependencias:
npm install

## Instala los navegadores necesarios para Playwright:
npx playwright install

## Configuración de Cucumber (cucumber.json)
El archivo cucumber.json está configurado para ejecutar las pruebas en paralelo y generar reportes en formato JSON y HTML:

```bash 
{
    "default": {
        "requireModule": [
            "ts-node/register"
        ],
        "require": [
            "src/test/steps/**/*.ts",
            "src/test/hooks/**/*.ts"
        ],
        "paths": [
            "src/test/features/**/*.feature"
        ],
        "format": [
            "progress",
            "json:reports/cucumber-report.json",
            "html:reports/cucumber-report.html"
        ],
        "formatOptions": {
            "snippetInterface": "async-await"
        },
        "publishQuiet": true,
        "dryRun": false,
        "parallel": 4
        
    }
}
```

## 🖥️ Hooks Principales (hooks.ts)
Los hooks configuran el navegador, el contexto y la página para las pruebas. A continuación, se muestra un ejemplo de configuración que incluye la ejecución en pantalla completa y una ralentización de la ejecución para facilitar la visualización:

```bash
import { chromium, Page, Browser, BrowserContext } from 'playwright';  
import { Before, After } from '@cucumber/cucumber';  
import { pageFixture } from '../utils/pageFixture';
 

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before( async function() {
    browser = await chromium.launch({ headless: false, slowMo: 600 });
    context = await browser.newContext({ viewport: null});
    page = await context.newPage();
    pageFixture.page = page;  
});

After( async function() {
    if (pageFixture.page) {
        await pageFixture.page.close();
    }
    await context.close();
    await browser.close();
});
```
## Ejecutar todas las pruebas
npm run test

## Ejecutar un feature específico
npm run test src/test/features/login.feature

## Reportes
Después de ejecutar las pruebas, se generan reportes en la carpeta reports/:
- JSON: reports/cucumber-report.json
- HTML: reports/cucumber-report.html

```bash
npm run report
```
## 👀 UI en Pantalla Completa

Las pruebas abren el navegador en pantalla completa gracias a:

- La configuración viewport: null en el BrowserContext.

## ✅ Buenas Prácticas

Utiliza el Page Object Model (POM) para organizar el código de las páginas y acciones.

Emplea fixtures (pageFixture) para compartir el objeto page entre los steps.

Ajusta slowMo y timeout según la estabilidad de tu aplicación.

Genera los reportes HTML en tu pipeline CI/CD para facilitar el análisis de resultados.

 




