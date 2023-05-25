//main.js
//Imports of all the necessary functions and apis
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const axios = require('axios');
const cheerio = require('cheerio');


const articles = [];

//listens for informatino sent to the channel "send-data"
ipcMain.on('send-data', (event, arg) => {
  console.log(arg)
  //this if statement checks to see if the user input
  //only runs when the user types a value in the input bar
  if (arg != "") {
    scrape(arg)
  } else {
    console.log("arg is empty")
  }

  function scrape (website) {
    axios(website)
    //searches the user inputted url online in real time
    //function samples and adjested to personal use from kubowania
        .then(response => {
            const data = response.data;
            const $ = cheerio.load(data);
            //cleans the website html page to just classes with ".fc-item__title"
            $(".fc-item__title", data).each(function() {
              //title and url pulled from the website html data to add to list
              const linktitle = $(this).text();
              const linkurl = $(this).find('a').attr('href')
              //removes certain headlines with censorable words
                if (!linktitle.includes("Ukraine" || "gore" || "death" || "killing" || "kill")) {
                  //adds kid-friendly news into articles list
                  articles.push(linktitle + "<br/>" + linkurl + "<br/> <br/>")
                }
            });
            console.log(articles)
            event.reply('reply', articles)
            //returns the sorted list of user friendly headlines
        })
  }
})

//creates presets to the application window connecting preload js file and html file
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  win.loadFile('index.html')
}
//creates the actual window
app.whenReady().then(() => {
  createWindow()
   app.on('activate', () => {
     if (BrowserWindow.getAllWindows().length === 0) {
       createWindow()
     }
   })
 })
 
//signals program when application is closed
 app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
     app.quit()
   }
 })



 


