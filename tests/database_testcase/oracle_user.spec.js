const { test, expect } = require('@playwright/test');
const { DatabaseConnection } = require('../../databases/oracle/dbConnection');
const { UserQueries } = require('../../databases/oracle/userQueries');
const testData = require('../../data/database/testData.json');
import * as allure from "allure-js-commons";

test.beforeAll(async () => {
  await DatabaseConnection.initialize();
});

test.afterAll(async () => {
  await DatabaseConnection.close();
});

test('should retrieve user credentials by site', async ({ page }) => {
  const testUser = testData.testUsers[0];

  await allure.step(`Query user account for site: ${testUser.site}`, async () => {
    const userAccount = await UserQueries.getUserAccountBySite(testUser.site);

    // Attach user account details as a JSON file in the Allure report
    allure.attachment('User Account Details', JSON.stringify(userAccount, null, 2), 'application/json');

    // Validate the retrieved user account
    expect(userAccount).toMatchObject({
      USERNAME: testUser.username,
      PASSWORD: testUser.password,
      SITE: testUser.site
    });

    console.log('Retrieved username:', userAccount.USERNAME);
    console.log('Retrieved password:', userAccount.PASSWORD);
  });
});