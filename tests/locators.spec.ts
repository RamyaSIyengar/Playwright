import {expect, test} from '@playwright/test'
import { filter } from 'rxjs-compat/operator/filter'

test.beforeEach(async ({page})=>{
    await page.goto("http://localhost:4200/")
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})


test("finding locators", async ({page})=>{
    
    // By TagName
   await page.locator("input").first().click()

   // By Id
   await page.locator("#inputEmail1").click()

   //by class
   page.locator(".shape-rectangle")

   //by full class
   page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

   //by attribute
   page.locator('[placeholder="Email"]')

   //combine diff selectors
   page.locator('input[placeholder="Email"][nbinput')

   //by xpath -- not recommended

   //partial text
   page.locator(':text("Using")')

   // full exact test
   page.locator(':text-is("Using the Grid")')

})

test("User facing locators", async({page})=>{
    await page.getByRole('textbox', {name:'Email'}).first().click()
    await page.getByRole('button', {name:'Sign in'}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Inline form').click()
    // added data-testid in html
    //<button data-testid="SignIn" type="submit" nbButton status="primary">Sign in</button>

    await page.getByTestId('SignIn').click()
    await page.getByTitle('IoT Dashboard').click()
})


test("locating child elements", async ({page})=> {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
                    //  parent  child  => space between parent and child
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click() //first one is more used

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click()  //least used

})


test("locating parent elements", async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail3')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('button', {name:'Submit'}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'}).getByRole('textbox', {name: "Email"}).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Password"}).click()
    /**
 * In order to find a web element using a locator method, you can use a text filter hasText: or 
 * a locator filter has: and then chain from this parent element all the child elements that
 * you want to select.

Also, you can alternatively use a filter method that will do exactly the same thing.
What is the benefit of using a filter method that you can chain multiple filters one by
one, narrowing down your output to the unique element until you get the desired result.

And if you just want to go one level up in the Dom to the parent element, you can use 
XPath approach by providing just double dots into the locator element and then find 
the child element that you want to find.
 */
})



test("Reusing locators", async ({page})=>{

    const Basicform = page.locator('nb-card').filter({hasText: 'Basic form'})
    const Emailfield = Basicform.getByRole("textbox", {name: 'Email'})

    await Emailfield.fill('ramya@gmail.com')
    await Basicform.getByRole("textbox", {name: 'Password'}).fill('ramya123')
    await Basicform.locator('nb-checkbox').click()
    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole("button").click()

    await expect(Emailfield).toHaveValue('ramya@gmail.com')
})

test("Extracting values", async ({page}) =>{
    const basicform = page.locator('nb-card').filter({hasText: 'Basic form'})
    const buttonText = await basicform.locator('button').textContent()

    expect(buttonText).toEqual('Submit')

    // all text values and check if it contains our expected value
    const allRadioButtonLabels = await page.locator("nb-radio").allTextContents()
    expect(allRadioButtonLabels).toContain('Option 1')

    // get input text value from email textbox
    const Emailfield = basicform.getByRole("textbox", {name: "Email"})
    await Emailfield.fill("test@test.com")
    const emailValue = await Emailfield.inputValue()
    expect(emailValue).toEqual("test@test.com")


    // get attribute
    const placeholderValue = await Emailfield.getAttribute("placeholder")
    expect(placeholderValue).toEqual('Email')

/**If you want to grab a single text from the web page for your web element => textContent()
If you want to grab all text elements for the list of the web elements => allTextContents()


You need to use a method all text contents if you want to get the property value of the input fields,
for example, which is not a text, you need to use a method => inputValue().

And if you want to get the value of any attributes on the web page, use method, get attribute and
as an argument, provide the name of the attribute and you will get the value of that particular attribute.
=> getAttribute("placeholder")
*/
})

test("assertions", async({page}) => {

    // general assertion
    const value = 5
    expect(value).toBe(5)

    
    const basicformbutton = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('Button')

    const buttonText = await basicformbutton.textContent()
    expect(buttonText).toEqual('Submit')

    //locator assertion
    await expect(basicformbutton).toHaveText('Submit')

    //soft assertion
    await expect.soft(basicformbutton).toHaveText('Submit3')
    // Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)
    await basicformbutton.click()

    /**
     * Playwright has two types of assertion, general assertions and locator assertions.

General assertions -

You just provide expect with the value that you want to assert and the desired method with the expectation.
General assertions will not wait for any conditions.
It simply perform the assertion when it's time to execute this particular line of code 

locator assertion-

Instead, they are a little bit smarter.
They can interact with the web elements and the methods of the locator assertions will wait up to five
seconds for the element to be available.

To make an assertion, to make a soft assertion, you just need to add dot soft.
In this case, your test will not fail and continue to run if assertion has failed.
     */
})



//toEqual() method belong to Generic assertion so "await" keyword in front will not have any effect
//toHaveText() method belongs to locator assertions. Keyword "await" should be used before "expect" instead of before locator

//Here is the HTML code:

// <div class="form-group row">
// <label class="col-sm-3 label">Radios</label>
// </div>

// Which assertion correctly validates the text "Radios" for the label



// ans - expect(await page.locator('label').textContent().toEqual('Radios'))

