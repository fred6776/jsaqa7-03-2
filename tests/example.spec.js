// @ts-check
import { test, expect } from "@playwright/test";
const { email, password } = require("../user.js");

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();

  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByText("Войти по почте").click();
  await page.screenshot({ path: "screenshots/1-enter.png", fullPage: false });

  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Пароль" }).click();
});

test("Successful authorization", async () => {
  await page.getByRole("textbox", { name: "Пароль" }).fill(password);
  await page.getByTestId("login-submit-btn").click();
  await page.screenshot({ path: "screenshots/2-succes.png", fullPage: false });
  await page.waitForURL(/\/profile\/.*/);

  await expect(page).toHaveTitle("Моё обучение");
  await page.screenshot({ path: "screenshots/3-succes.png", fullPage: false });
});

test("Unsuccessful authorization", async () => {
  await page.getByRole("textbox", { name: "Пароль" }).fill("22ee2e2141rq");
  await page.getByTestId("login-submit-btn").click();

  await expect(page.getByTestId("login-error-hint")).toBeVisible({
    timeout: 30000,
  });
  await page.screenshot({
    path: "screenshots/2-unsucces.png",
    fullPage: false,
  });
});
