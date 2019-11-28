import puppeteer from 'puppeteer';

const devices = require('puppeteer/DeviceDescriptors');

export default class galleryDriver {
  constructor() {
    this.timeout = 60000;
    this.browser = {};
    this.windowSize = {
      width: 1920,
      height: 1080,
    };
  }

  async launchPuppeteer() {
    const args = [
      '--no-sandbox',
      `--window-size=${this.windowSize.width},${this.windowSize.height}`,
    ];
    this.browser = await puppeteer.launch({
      args,
    })
    return this.browser;
  }

  async openPage(styleParams, device) {
    if (!this.browser) {
      await this.launchPuppeteer();
    }
    const page = await this.browser.newPage();

    switch (device) {
      case 'Android':
        await page.emulate(devices['Galaxy S5']);
        break;
      case 'iPhone':
        await page.emulate(devices['iPhone X']);
        break;
      default:
        await page.setViewport(this.windowSize);
    }
    await page.goto(this.getPageUrl(styleParams));
    this.page = page;
    return this.page;
  }


  async closeBrowser() {
    try {
      await this.browser.close();
    } catch (e) {
      //
    }
  }

  get find() {
    return {
      hook: async str => await this.page.$$(`[data-hook="${str}"]`),
      items: async () => await this.page.$$('.gallery-item-container'),
    };
  }

  get actions() {
    return {
      hover: async str => await this.page.hover(`[data-hook="${str}"]`),
      click: async str => await this.page.click(`[data-hook="${str}"]`),
    };
  }
  getPageUrl(styleParams){
    let urlParam = ''
    //Object.keys(styleParams).map(sp => urlParam += `${sp}=${styleParams[sp]}`);
    //return `http://localhost:3000/?${urlParam}`;
    return `http://localhost:3000/?galleryLayout=2`;
  }
  get grab(){
    return {
      screenshot: async (path) =>{
        return await this.page.screenshot({ path: 'screenshot.png'})
      }
    }
  }

  get waitFor() {
    return {
      hookToExist: async str =>
        await this.page.waitForSelector(`[data-hook="${str}"]`, {
          timeout: 3000,
        }),
      hookToBeVisible: async str =>
        await this.page.waitForSelector(`[data-hook="${str}"]`, {
          visible: true,
        }),
      hookToBeHidden: async str =>
        await this.page.waitForSelector(`[data-hook="${str}"]`, {
          hidden: true,
        }),
      timer: async time => await this.page.waitFor(time),
      newPage: async (timeoutSec = 5000) => {
        return new Promise((resolve, reject) => {
          this.browser.on('targetcreated', resolve);
          this.page.waitFor(timeoutSec).then(reject);
        });
      },
    };
  }
}