import { Injectable } from '@nestjs/common';
import { data } from 'jquery';
// import puppeteer from 'puppeteer/lib/types';
import * as puppeteer from 'puppeteer';


@Injectable()
export class ScraperService {
  async scrape() {
    const url = 'https://psc.gov.np/category/notice-advertisement/all.html';
    // const url = 'https://www.booklifter.com';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Use Puppeteer to scrape the website

    const scrapNotice = await page.evaluate((url) => {
      const title1 = document.querySelector('h1').innerText;
      // console.log(title1);
      const notices = Array.from(document.querySelectorAll('tr td'));
      const data = notices.map((notice: any) => ({
        title: notice.querySelector('a div').innerText,
        pdfUrl: notice.querySelector('a').getAttribute('href'),
        imgSrc: url + notice.querySelector('a img').getAttribute('src'),
        mainTitle: title1,
      }));
      return data;
    }, url);
    await browser.close();
    // console.log(title1);
    console.log(scrapNotice);
  }

  //for button
  async scrapeData(): Promise<any> {
    const url = 'https://psc.gov.np';
    const browser = await puppeteer.launch(
        {headless: false,
      defaultViewport: null,}
    );
    const page = await browser.newPage();
    await page.goto(url);

    // Click the button and wait for the data to load
    // await page.click('div.uk-margin.tab-panel a.uk-button.uk-active');
    await page.click('div[data-uk-switcher] > a.uk-button.uk-active');
    await page.waitForSelector('*[aria-expanded="true"]');

    // Use Puppeteer to extract the data from the element with aria-expanded="true"
    const clickData = await page.$eval(
      // '*[aria-expanded="true"] #button-content ul li.uk-active',
      'ul#button-content.uk-switcher li.uk-active',
      (el) => el.textContent,
    );
    // await browser.close();

    // return { data: newData };
    // console.log(firstButton);
    return clickData

  }
}
