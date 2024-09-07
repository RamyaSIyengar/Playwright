const {test} = require('@playwright/test')

test.beforeEach(async ({page})=> {
    await page.goto("http://localhost:4200/")
})

test.describe("test suit1", async ()=>{
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })

    test("go to Forms", async ({page}) =>{
        await page.getByText('Form Layouts').click()
    })

    test("navigate to data picker", async ({page})=>{
        await page.getByText('Datepicker').click()
    })
})