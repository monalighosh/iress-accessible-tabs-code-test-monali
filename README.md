# Iress Accessible Tabs Code Test

## Tech stack used:

- HTML
- SASS compiled to CSS
- Vanilla Javascript
- Command-line HTTP server to run project

## Project features:

- Added multiple tab groups in a single page
- Active tab of each tab group remains active on page refresh and back/forward navigation
- Link for any given tab on a page can be shared
- Design is responsive and works on the latest versions of all modern browsers such as Chrome, Firefox, Edge and Safari
- Added styling to make it presentable
- Made it screen reader and keyboard accessible

## How to run project:

(You will need Node and NPM installed on your computer. If you don't, please install them first.)

- Run `git clone https://github.com/monalighosh/iress-accessible-tabs-code-test-monali.git`
- Once its cloned, run `cd iress-accessible-tabs-code-test-monali`
- Next run these commands:

```
nvm use
npm install
npm start
```

- This will start HTTP server on 8080 port. Visit [http://localhost:8080/](http://localhost:8080/) to view it in the browser.

## How to test project features:

- On first page load, first tab of every tab group is selected by default. Click on rest of the tab to view relevant content.
- Select a tab from each tab group. Refresh the page to test if active tab of each tab group is remains active.
- Visit link to test [http://localhost:8080/#group1-tab-panel-2](http://localhost:8080/#group1-tab-panel-2) and see if the second tab of tab group 1 is active.
- Use Chrome's dev tools "Toggle device toolbar" option to simulate Mobile, Tablet devices view to test responsiveness.
- Use screen reader and try to navigate using keyboard to test accessibility.

## Need improvements:

- Unit/Integration testing can be incorporated to avoid bugs and improve code
- HTML and JS need to be minified, Gzipped in production
- Tabgroup and it's content can be dynamically redenered with fetch API
