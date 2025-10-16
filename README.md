# Arquitectura POO para Automatización QA

## Objetivo
Crear un patrón de diseño personalizado usando conceptos de Programación Orientada a Objetos (POO) para modularizar pruebas automatizadas. Esta es la base conceptual antes de aprender patrones como Page Object Model (POM), ScreenToPlay u otros.

## Concepto Clave
La **modularización** mediante POO nos permite separar responsabilidades:
- **Locators**: Dónde están los elementos (selectores encapsulados)
- **Actions**: Qué hacen los elementos (interacciones genéricas)
- **Tasks**: Qué hacen los usuarios (flujos de negocio complejos)
- **Utils**: Datos y funciones reutilizables

## Setup Inicial

```bash
npm init -y
npm install @playwright/test @types/node --save-dev
npx playwright install
```

## Estructura de Carpetas

```
qa-test-class3/
├── e2e-design/
│   ├── locators/         # Selectores de elementos
│   ├── actions/          # Interacciones base
│   ├── tasks/            # Flujos de usuario
│   └── utils/            # Datos y utilidades
├── tests/                # Specs (.spec.ts)
├── test-results/
├── playwright-report/
├── allure-results/
└── node_modules/
```

## Ejemplos Prácticos

### Locators (Encapsular selectores)
```typescript
// loginLocators.ts
export class LoginLocators {
    constructor(private page: Page) {}

    get usernameInput() {
        return this.page.getByPlaceholder('Username');
    }

    get passwordInput() {
        return this.page.getByPlaceholder('Password');
    }

    get loginButton() {
        return this.page.getByRole('button', { name: 'LOGIN' });
    }
}
```

### Actions (Interacciones genéricas)
```typescript
// loginActions.ts
export class LoginActions {
    constructor(private page: Page) {}

    async navigateToLoginPage(url: string) {
        await this.page.goto(url);
    }

    async doEnterText(selector: Locator, text: string) {
        await selector.fill(text);
    }

    async doClick(selector: Locator) {
        await selector.click();
    }
}
```

### Tasks (Flujos de negocio)
```typescript
// loginTask.ts
export class LoginTask {
    private loginLocators: LoginLocators;
    private loginActions: LoginActions;

    constructor(page: Page) {
        this.loginLocators = new LoginLocators(page);
        this.loginActions = new LoginActions(page);
    }

    async doLogin(username: string, password: string) {
        await this.loginActions.doEnterText(
            this.loginLocators.usernameInput, 
            username
        );
        await this.loginActions.doEnterText(
            this.loginLocators.passwordInput, 
            password
        );
        await this.loginActions.doClick(this.loginLocators.loginButton);
    }
}
```

### Utils (Datos y constantes)
```typescript
// testData.ts
export class TestData {
    static readonly USERS = {
        STANDARD_USER: {
            username: 'standard_user',
            password: 'secret_sauce'
        },
        LOCKED_USER: {
            username: 'locked_out_user',
            password: 'secret_sauce'
        }
    };

    static readonly URLS = {
        LOGIN: 'https://www.saucedemo.com/'
    };
}
```

## Uso en Tests

```typescript
// test-1.spec.ts
import { test, expect } from '@playwright/test';
import { LoginTask } from '../e2e-design/tasks/loginTask';
import { TestData } from '../e2e-design/utils/testData';

test('Successful login', async ({ page }) => {
    const loginTask = new LoginTask(page);
    
    await loginTask.doLogin(
        TestData.USERS.STANDARD_USER.username,
        TestData.USERS.STANDARD_USER.password
    );
    
    expect(page).toHaveURL(/inventory/);
});
```

## Ejecución

```bash
npx playwright test
npx playwright show-report
```

## Próximos Pasos
Aprender patrones formales como POM o ScreenToPlay que siguen estos mismos principios de manera estandarizada.