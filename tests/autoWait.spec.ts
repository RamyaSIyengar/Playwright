import {test, expect} from '@playwright/test'
import { time } from 'console'

test.beforeEach(async({page}, testInfo)=>{
    await page.goto("http://www.uitestingplayground.com/ajax")
    await page.getByText("Button Triggering AJAX Request").click()

    testInfo.setTimeout(testInfo.timeout + 2000)  // this will modify the default timeout for plus two seconds and it will be applied for every test
    
})

test("auto waiting", async ({page})=>{
    const SuccessButton = page.locator('.bg-success')

    // await SuccessButton.click()

    // above works and it took 18 sec but now if i add timeout: 10000 10s
    // it will try to run in that 10 s and if element not found will throw timeout error

    //now trying with textContent of the result to be available 
    // const Sucesstext = await SuccessButton.textContent()

    // when used allTextContent
    // const Sucesstext = await SuccessButton.allTextContents()


    /**
     * Error: expect(received).toEqual(expected) // deep equality
        Expected: "Data loaded with AJAX get request."
        Received: []

        allTextContent() doesnt wait for the text to showup.
        We see expected data loaded with Ajax but received: [] empty simply because all text content didn't wait.
     */


        //We can create additional wait for the methods like this allTextContents()  which do not have implemented auto wait logic.
            // await SuccessButton.waitFor({state: 'attached'})
            // const Sucesstext = await SuccessButton.allTextContents()

         // expect(Sucesstext).toContain('Data loaded with AJAX get request.')

            await expect(SuccessButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
            // commented all above code to check the result 
            // default timeout for the locator assertion is five seconds.

            /**
             * Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)

                Locator: locator('.bg-success')
                Expected string: "Data loaded with Ajax get request"
                Received: <element(s) not found>

             */

                // we can add the timeout explicitly


})



test("alternative waits", async({page}) => {

    const SuccessButton = page.locator('.bg-success')

    //wait for the element

    // await page.waitForSelector('.bg-success')

    //wait for Response from AJAX call (to check inspext > network)

    await page.waitForResponse('http://www.uitestingplayground.com/ajaxdata')

    // await page.waitForLoadState('networkidle')  Not Recommended
    // await page.waitForTimeout(5000) jus like time.sleep(5)

    const Sucesstext = await SuccessButton.allTextContents()
    expect(Sucesstext).toContain('Data loaded with AJAX get request.')



/**
* Playwright has automatic waiting mechanism for the certain conditions to be satisfied, such as 
* attached,visible, stable, receive events, enabled and editable. 
And also playwright has a limited number of the methods that supports this outer waiting.
The list of this method you can find here in the playwright documentation. https://playwright.dev/docs/actionability
This table provides the method name and what kind of conditions this method will automatically wait on the page to be satisfied.
The duration of this wait is defined by the timeout settings.

If you interacting with the elements that do not support auto waiting, for example all text contents,
you can add additional wait to wait for a specific state or you can use alternative waits such as wait
for the selector, wait for the response and few others that you can choose that works best for you.
 */


})



test("timeouts", async({page}) => {
    // Test timeout	30000 ms
    // Expect timeout 5000 ms   note- expect timeout shd always be less than test timeouts
    // Global timeout - time limit of the whole test => default no limit
    //Action timeout - time limit for the action command ex click(), fill(), textContent()=> default no limit
    //Navigation timeout - time limit for the action command page.goto()=> default no limit

    /**in playwright.config.ts
     export default defineConfig({
        timeout: 10000,
        globalTimeout:60000,})

    and add other timeouts add in use()

    use: {
     actionTimeout: 5000,
    navigationTimeout: 5000,
    }
     */

    // when test timeout is mentioned in here it will override the timeout in config file
    test.setTimeout(10000)
    /**
     * you have a slow test that is flaky and you want to increase the timeout just for this particular
     *  test.And playwright has a command test dot slow.If you mark your test with this command slow will
     *  increase the default timeout in three times to allow your test a little bit more time to continue the execution.
     */

    test.slow()  // Marks a test as "slow". Slow test will be given triple the default timeout.

    const successButton = page.locator('.bg-success')

    await successButton.click({timeout: 19000})
    // await successButton.click({timeout: 19000})
    // when action timeout is 5s, when not able to click within time raises TimeoutError: locator.click: Timeout 5000ms exceeded.
    // to overcome this add explicit timeout here inside click as u know the time it takes for ajax call ie 18s
    // it will override the time in config file


    /**
     * you want to modify the test timeout for a particular test suite.
    You can do it using a beforeeach hook.
    So inside of the before each hook, you need to provide the second argument, which is test info
     */



    /**
     * Playwright has global timeout, test timeout, different action navigation timeouts, 
     * action navigation and expect timeouts are within test timeout and 
     * test timeout within a global timeout.

Only test timeout has a default configuration - 30sec and expect timeout has default configuration-5sec.
The rest of the timeouts are not configured by default.
You can configure timeouts globally for the framework in the configuration object of the playwright.
Define a timeout for the test.Global timeout.Expect timeout navigation timeout and action timeout.
Also, you can override the settings defined in the config object by providing them directly inside of the test.
You can set the settings for the particular test for the timeout or the particular action command that
you want to override the waiting time.
     */
})