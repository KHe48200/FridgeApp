# Fridge App 

[Description](https://github.com/kalleheini1994/FridgeApp#description)  |  [Install](https://github.com/kalleheini1994/FridgeApp#install)  |  [Getting started](https://github.com/kalleheini1994/FridgeApp#getting-started)

## Description

### Fridge App is a web application for keeping track of your groceries by allowing you to add/modify/remove items on your fridge and shopping list. 
This application works by moving products between fridge and shopping list based on their status (running out/run out/got it). This means that items appear where you need them to appear eg. run out products move from fridge to shopping list so you'll know you need to buy these.

Fridge app is built using:
* MonogoDB, a NoSQL database used to store all products
* Express.js, a web application framework that runs on Node.js
* Pug,  template engine for Node.js. [Pug Github page](https://github.com/pugjs/pug)
* Node.js, an execution environment for event-driven server-side and networking applications.


## Install

### 1. Install Node.js. 
   Node.js can be downloaded [here](https://nodejs.org/en/download/). LTS version recommended.
### 2. Install MongoDB
   MongoDB can be downloaded [here](https://www.mongodb.com/download-center/community). MongoDB can be installed using complete install with default settings.
### 3. Clone or download this repository
   If you download this repository as a ZIP file file unzip it before continuing.
### 4. Move into the project folder using command line
   Open command line and use command **cd C:\Example\Folder\FridgeApp-master\FridgeApp-master** to move to the project folder.
### 5. Install dependencies
   This is done using a command **npm install**.
### 6. Start the server
   This is done using a command **node app**
   
   Now your Fridge App can be accessed with your internet browser on address **localhost:3000**


## Getting started

### Adding products
This is used to add products to either fridge of shopping list
![alt text](https://github.com/kalleheini1994/FridgeApp/blob/master/images/productAdd.gif "Add product to fridge")
### Running out
Product marked as running out it will change to yellow. This also adds this item to your shopping list as running out (yellow).
![alt text](https://github.com/kalleheini1994/FridgeApp/blob/master/images/productRunningOut.gif "Mark product as running out")
### Run out
Product marked as run out it will change to red. This removes this item from fridge and adds it to shopping list as run out (red).

![alt text](https://github.com/kalleheini1994/FridgeApp/blob/master/images/productRunOut.gif "Mark product as run out")
### Got it
Product marked as gotten will be removed from shopping list and added to fridge
![alt text](https://github.com/kalleheini1994/FridgeApp/blob/master/images/productGotIt.gif "Sort by name")
### Sorting products 
Products can be sorted either alphabetically or by status
![alt text](https://github.com/kalleheini1994/FridgeApp/blob/master/images/productSortByName.gif "Got it") ![alt text](https://github.com/kalleheini1994/FridgeApp/blob/master/images/productSortByStatus.gif "Sort by status")
### Searching products
Products can be searched using their names
![alt text](https://github.com/kalleheini1994/FridgeApp/blob/master/images/productSearchByName.gif "Search")
