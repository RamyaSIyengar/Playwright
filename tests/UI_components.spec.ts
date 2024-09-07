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
    
    
    
