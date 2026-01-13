// @ts-check
import { test, expect } from "@playwright/test";
const { email, password } = require("../user.js");

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByText("Войти по почте").click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill(password);
  await page.getByTestId("login-submit-btn").click();
  await page.waitForURL(/\/profile\/.*/);

  await expect(page).toHaveTitle("Моё обучение");
});

test("Unsuccessful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByText("Войти по почте").click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill("22ee2e2141rq");
  await page.getByTestId("login-submit-btn").click();

  await expect(page.getByTestId("login-error-hint")).toBeVisible({
    timeout: 30000,
  });
});
