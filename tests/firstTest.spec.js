const {test} =  require('@playwright/test')

test("test suite1", async ({page})=>{
     await page.goto("http://localhost:4200/");
     await page.getByText("Forms").click()
     await page.getByText("Form Layouts").click()
     

})