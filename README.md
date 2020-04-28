# COVID-19_tracker\_analysis

<!--## Topic: 
### Build a website doing track and analysis of coronavirus in worldwide and America, including frontend and backend development.-->

### Functions:

* Crawl data from the website maintained by [John Hopkins University CSSEGISandData/COVID-19: Novel Coronavirus (COVID-19) Cases, provided by JHU CSSE](https://github.com/CSSEGISandData/COVID-19) and some other APIs
* Update the virus data automatically from server API every hour, both for worldwide data and US state data, like how many people get infected, how many deaths, how many people get cured and so on. 
* Add a safety advice module to tell people what to do during this pandemic infection.
* Write a footer and about us page to let people who browse this website have a better understanding about our project.
* Build a news page using Microsoft Bing News API to let the website show the top news about coronavirus in the US
* Write an Email subscriber to let people who want to keep updated with our website can subscribe to our newsletter, using [nodemailer](https://nodemailer.com/message/).
* Host this project on Heroku

### Tools in use: 
* Frontend framework: Angular and Bootstrap4
* Backend framework: Node.js
* Frontend icon: Google Map API and Chart.js
* Host Platform: Heroku

### Structure:
![Markdown preferences pane](https://github.com/guohaoyu110/COVID-19_tracker_analysis/blob/master/frontend/src/assets/structure.png)

## Getting started
#### To get the Node server running locally:

- Clone this repo
- to install all required dependencies

```bash
$ npm install
```
go to backend and run 

```bash
$ node index.js
```

#### To get the frontend running locally:

go to /frontend, then run

- Clone the repository.
- Run npm install in folder.
- Make sure you have npm and angular-cli installed.
- After installation is done, run ng serve and open website at https://localhost:4200

## Group members:
Haoyu Guo   haoyuguo@usc.edu

Tianyi Xu   xutianyi@usc.edu 

<!--## Project proposal link:
https://docs.google.com/document/d/1BZBz4xfLIjS1I38m2HDi_x4Uc1u7bs1zMvgfVtk7GB4/edit-->

## License:
[MIT](https://choosealicense.com/licenses/mit/)
