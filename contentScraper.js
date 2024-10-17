const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsite(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let scrapedData = [];
        
        // Scraping all article titles and URLs
        $('article h2 a').each((index, element) => {
            const title = $(element).text().trim();
            const link = $(element).attr('href');
            scrapedData.push({ title, link });
        });

        return scrapedData;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
    }
}

const url = 'https://example-blog.com'; // Replace with any website
scrapeWebsite(url).then(scrapedData => {
    console.log('Scraped Articles:', scrapedData);
});
