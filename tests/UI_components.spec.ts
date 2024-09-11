import {expect, test} from '@playwright/test'


test.beforeEach(async ({page})=>{
    await page.goto("http://localhost:4200/")
})


test.describe("Form layout page", ()=>{
    test.beforeEach(async({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    }) 

    test("login input field", async({page})=>{
        const usingGridEmailInput =  page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: "Email"})
        await usingGridEmailInput.fill('test@play.com')
        await usingGridEmailInput.clear()
        await usingGridEmailInput.pressSequentially('raj@test.com')  
        // await usingGridEmailInput.pressSequentially('raj@test.com', {delay: 500})  //String of characters to sequentially press into a focused element.

        //generic assertions
        const input_Value = await usingGridEmailInput.inputValue()
        expect(input_Value).toEqual('raj@test.com')

        //locator assertions
        // await expect(usingGridEmailInput).toHaveText('raj@test.com')  //toHaveText will not work for the input field.
        await expect(usingGridEmailInput).toHaveValue('raj@test.com')

 /**
* 
In order to type any text into the input fields, you need to use method fill() and provide the argument as a string.
In order to clear the input field, you need to use method clear() that have to be called from the locator.
If you want to simulate a keystrokes on the keyboard, you can use method pressSequentially() and if
you want to simulate delays between the keystroke, you can pass additional argument providing the amount in milliseconds.How long do you want to delay a keystrokes?

Also, for generic assertion, you need to use a method input value that will extract the value from
the locator from the input field and assign to the constant or variable.
And then you can call generic assertion to perform the validations.
If you use a locator assertion, you provide the locator and use a method to have value.
Assigning the value inside of the input field.
     */
    })

    test("input radio", async({page})=>{
       const usingTheGridForm =  page.locator('nb-card', {hasText: 'Using the Grid'})
       // 2 locator ways to click option1 getByLabel(uses visible text) or getByRole
    //await usingTheGridForm.getByLabel('Option 1').check({force: true})
    await usingTheGridForm.getByRole("radio", {name: "Option 1"}).check({force: true})  // if the visually-hidden then force:true check to bypass the actionability checks.

    //to validate if our selection was actually successful - 
    //If you want to use a generic type of the assertion first you need to take the status of this radio button.selecetd or not

    const radioStatus = await usingTheGridForm.getByRole("radio", {name: "Option 1"}).isChecked()  
    //generic assertion 
    expect(radioStatus).toBeTruthy
    // locator assertion.
    await expect(usingTheGridForm.getByRole("radio", {name: "Option 1"})).toBeChecked()
    

    //now check option 2 and see option1 shd be unchecked
    await usingTheGridForm.getByRole("radio", {name: "Option 2"}).check({force: true})
    expect(radioStatus).toBeFalsy //option1 shd be unchecked
    expect(usingTheGridForm.getByRole("radio", {name: "Option 2"}).isChecked()).toBeTruthy //option2 shd be chedcked
    //locator assertion
    await expect(usingTheGridForm.getByRole("radio", {name: "Option 2"})).toBeChecked()

/**
In order to select the radio button, the most recommended way is to use 
Get By role radio and provide the name of the radio button.
To select the radio button, use a method to check() 
if the radio button is hidden for some reason, you can use a command 
{force:True} to bypass playwright check of availability in order 

To validate the status iss it selected or not?
You can use generic assertion or locator assertion for generic assertion.

Using generic assertion - ischecked() -you can get the status of the web element and 
then you can make validation of the status Is it true or false?

using locator assertion- toBeChecked() and as a shortcut for generic assertion,
you can always provide the entire locator as the argument to the expect command and then to validate
if the radio button status is falsy or truthy, which means is unselected or selected.
     */
})
} )



test("CheckBox Form",async({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

 
    await page.locator('nb-checkbox').getByRole('checkbox', {name: 'Hide on click'}).uncheck({force:true})
    await page.locator('nb-checkbox').getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force:true})
    const allBoxes = page.locator('nb-checkbox').getByRole('checkbox')
    for (const box of await allBoxes.all()){
        await box.check({force:true})
        expect(await box.isChecked()).toBeTruthy()
        await box.uncheck({force:true})
        expect(await box.isChecked()).toBeFalsy()

    }
/**
* Check and uncheck commands are checking the status of the checkbox if the checkbox is checked.
The check command will not make any selection the same for uncheck.
If unchecked box is already unchecked, it will not make any selection and the remaining the checkbox
             */
    
})

test("lists and dropdown", async({page})=>{
        const dropdownMenu = page.locator('ngx-header nb-select')
        await dropdownMenu.click()

        page.getByRole('list') //when list has UL tag
        page.getByRole('listitem') //when list has li tag

        // const optionList = page.getByRole('list').locator('nb-option')
        //better option 
        const optionList =page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
        await optionList.filter({hasText: 'Cosmic'}).click()

        const header = page.locator('nb-layout-header')

        //verification
        await expect(header).toHaveCSS('background-color',"rgb(50, 50, 89)")

        //for all colors
        const colors = {

            "Light":"rgb(255, 255, 255)",
            "Dark":"rgb(34, 43, 69)",
            "Cosmic":"rgb(50, 50, 89)",
            "Corporate":"rgb(255, 255, 255)"
        }

        await dropdownMenu.click()
        for(const color in colors){
            await optionList.filter({hasText:color}).click()
            await expect(header).toHaveCSS('background-color',colors[color])
            if(color!="Corporate")
                await dropdownMenu.click()
            

        }
})

test('tooltips', async({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', {hasText:"Tooltip Placements"})
    await toolTipCard.getByRole('button', {name: "Top"}).hover()

    page.getByRole('tooltip') //if you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')

    /*** In order to locate the tooltip, sometimes it's challenging to identify the right locator so you can
     * use ctrl + \ on Windows to freeze the browser in order to find
     * out the tooltip which is dynamically shows up and hiding in the Dom in order to simulate the hover over
     * the button, to trigger the tooltip to show up, you can use method hover in the playwright.
     * If the tooltip role is available in the Dom, you can use get by role tooltip to get the locator for
     * your tooltip, and the assertion of the text is very simple.
     */
})


test("dialog alert", async ({page})=>{
    await page.getByText("Modal & Overlays").click()
    await page.getByText("Dialog").click()
    await page.locator('nb-card').getByRole('button', {name:"Open Dialog with component"}).click()

    await page.locator('nb-card-footer').getByRole("button", {name:"Dismiss Dialog"}).click()
})
    
test("dialog dynamic", async ({page})=> {
    await page.getByText("Tables & Data").click()
    await page.getByText("Smart Table").click()

    // to accept the dialog box
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole("table").locator("tr", {hasText:"mdo@gmail.com"}).locator('.ng2-smart-action-delete-delete').click()
    //to verify
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')


    /**
     * When you are dealing with dialog boxes, if this is a regular web dialog box, you automate it as usual,
    inspect element, find the element, interact with this.

    But if you are dealing with the browser dialog boxes in order to accept it, you need to call 
    page.on dialog listener and then inside of the dialog box need to call dialog accept.
     Then playwright will accept this dialog and you will be able to move forward.
     * 
     */
})
    

test("dynamic table", async({page})=>{
    await page.getByText("Tables & Data").click()
    await page.getByText("Smart Table").click()


    //1 get the row by any test in this row
    // const targetRow = page.getByRole('row',{name: 'twitter@outlook.com'})
    // await targetRow.locator('.nb-edit').click()
    // await page.locator('input-editor').getByPlaceholder('Age').clear()
    // await page.locator('input-editor').getByPlaceholder('Age').fill('26')
    // await page.locator('.nb-checkmark').click()

    //2 get the row based on the value in specific column
    await page.locator('.ng2-smart-page-link').getByText('2').click()
    const targetRowById = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('ramyaiyengar12@gmail.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('ramyaiyengar12@gmail.com')


    /**
     * If you want to locate any row in the table and your table has a unique text, 
     * you can use this for get by row and provide the text that is displayed in the table.
     * Keep in mind the text that displayed in the table.Not always text.
     * It sometimes can be a value.In this case, you will not be able to use this construction.
     * You will need to use a different identifier such as get by placeholder or something else.
     * If the text that you are looking for in the row is not unique but unique for the certain
     * column, you
     * can use a filter narrowing down the output of your row by a specific column using the 
     * constructions
     * like that using a locator filter.
     * Then when you want to make the assertion, you can always navigate into the desired column
     *  by the index of this column and make an assertion.
     */


    //3 test filter of the table
    const ages = ['20', '30', '40', '60']

    for(let age of ages){

        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)

        const ageRows = page.locator('tbody tr')

        for(let row of await ageRows.all()){
            const cellValue = await page.locator('td').last().textContent()

            if(age == '60'){
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            }else{
                expect(cellValue).toEqual(age)
            }
            
        }
    }

    /**
     * When you look through the list of the roles, you can use a regular for loop.
     * In our example, we use first the test data and then we looped through the each of the row to validatethose expectations.
     * So we created a simple locator to get all the rows.
     * Then out of those roles need to create an array using all method and then row represent the iterator
     * for the row that you can access as a regular locator.
     * Finding the columns that you want to interact with.
     * And you can also use a conditions to tailor your assertion based on the output of the table.
     */
})

