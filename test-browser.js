const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome-stable',
    args: [
      // This is needed to chrome with puppeteer
      '--no-sandbox',
      // Some of the following might be applied by default by puppeteer or ineffective
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu',
      '--mute-audio',
      '--disable-web-security',
      '--allow-file-access-from-files',
      '--disable-client-side-phishing-detection',
      '--disable-default-apps',
      '--disable-features=Translate',
      '--no-default-browser-check',
      '--ignore-certificate-errors'
      //--disable-extensions // Might be necessary for metamask tests
    ]
  });

  const page = await browser.newPage();
  await page.goto('https://example.com');
  console.log(await page.title());
  await browser.close();
})();
