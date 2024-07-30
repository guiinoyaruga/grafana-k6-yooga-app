import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
     await page.goto('https://app.yooga.com.br/');


    // Enter login credentials
    await page.locator('input[placeholder="Insira seu CPF ou CNPJ"]').type('146.256.737-12');
    await page.locator('input[placeholder="Senha"]').type('humm3r28@*');

    const submitButton = page.locator('#login-btn')

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    await page.screenshot({ path: 'screenshots/screenshot.png' });
  } finally {
    await page.close();
  }
}