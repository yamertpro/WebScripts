describe('test the frames', function () {
    it('should check all the frames', function () {
        browser.waitForAngularEnabled(false);
        browser.get('https://the-internet.herokuapp.com/nested_frames');
        expect(browser.getCurrentUrl()).toEqual('https://the-internet.herokuapp.com/nested_frames');
        // browser.switchTo().frame(element(by.tagName('iframe')).getWebElement());
        browser.switchTo().frame(0); // going to frameset (top)
        browser.switchTo().frame(0); // going deeper to frame Left
        expect(element(by.tagName('BODY')).getText()).toBe('LEFT'); //get inner element
        
        browser.switchTo().defaultContent(); // get back to main
        browser.switchTo().frame(0); //going to frameset (top)
        browser.switchTo().frame(1); // going deeper to frame middle
        expect(element(by.id('content')).getText()).toBe('MIDDLE'); //this element has an id 'content', so we search element by this id

        browser.switchTo().defaultContent(); // get back to main
        browser.switchTo().frame(0); //going to frameset (top)
        browser.switchTo().frame(2); // going deeper to frame middle
        expect(element(by.tagName('BODY')).getText()).toBe('RIGHT'); //get inner element

        browser.switchTo().defaultContent(); // get back to main
        browser.switchTo().frame(1); //going to frameset (bottom)
        expect(element(by.tagName('BODY')).getText()).toBe('BOTTOM'); // get inner element

        //P.S.: I think it is very simple and primitive way to work with frames, and I hope the is a more wise way :)
        //


    });
});