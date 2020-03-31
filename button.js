describe('test the button', function () {
  it('should press the buttons and links', function () {

    browser.waitForAngularEnabled(false); // I guess it is not the Angular app, because there was errors, so I turn it off.
    browser.manage().window().setSize(1280, 1024);
    let mainLink = 'https://the-internet.herokuapp.com/dynamic_loading/1';

    browser.get(mainLink); //go to main test link

    //start
    browser.getWindowHandle().then(function (parentGUID) { //get main page id, for future switch between tabs

      expect(browser.getCurrentUrl()).toEqual(mainLink);

      // expect(browser.getTitle()).toEqual('The Internet'); //check that browser get to right link

      let buttonStart = element(by.buttonText('Start'));

      buttonStart.click(); //press the button

      browser.sleep(5000); //wait 5 sec, because loading lasts 5 sec

      let buttonFinishCheck = element(by.id('finish')).getText('Hello World!'); //create var res with value (text) = 'Hello World!'

      expect(buttonFinishCheck).toEqual('Hello World!'); //check button result

      let seleniumLink = 'http://elementalselenium.com/'; //link for check

      expect(element(by.linkText('Elemental Selenium')).getTagName()).toBe('a'); //check link on main page
      let link_below = element(by.linkText('Elemental Selenium'));
      link_below.click();

      browser.sleep(2000);

      browser.getAllWindowHandles().then(function (allGUID) { //get all tabs 
        console.log('total windows count: ' + allGUID.length); //it was for debug
        for (let guid of allGUID) {
          if (guid != parentGUID) { //get not parent tab
            browser.switchTo().window(guid); //get to selenium link
            break;
          }
        }
        browser.getCurrentUrl().then(function (url) { //check current url
          console.log("Elemental Selenium URL= " + url);
          expect(url).toEqual(seleniumLink); //check for expected url
          browser.close(); //close selenium tab
          browser.switchTo().window(parentGUID); //switch to main page
        })
        browser.getCurrentUrl().then(function (url) { //check that we are on the main page
          console.log("main URL= " + url);
        })

        let imgLink = 'https://github.com/tourdedave/the-internet'; //link for check
        expect(element(by.css('img[alt="Fork me on GitHub"]'))); //search for img link

        let linkImg = element(by.css('img[alt="Fork me on GitHub"]'));

        linkImg.click();

        browser.sleep(2000);
        browser.getAllWindowHandles().then(function (allGUID) { 

          //again search for all open tabs. I guess it not importan, 
          //beacuse github link opens in the same tab, but if it would open in a new tab, it would be useful.

          console.log('total windows count: ' + allGUID.length);
          for (let guid of allGUID) {
            if (guid != parentGUID) {
              browser.switchTo().window(guid); 
              break;
            }
          }
        });
        browser.getCurrentUrl().then(function (url) {
          expect(url).toEqual(imgLink);
          console.log("image URL= " + url);
        });
      });
    });
  });
});