AmpBuddy
## Build a Dynamic Website with Koa.js

To install you will need the following...
1. Node.js 7.x.x or higher
2. MongoDB or access to a Mongo cloud host such as Mlab
3. Yarn (optional but recommended)

Next you will need to do the following
1. `git clone` the app
2. `cd` in to the app's root directory
3. `yarn install`
4. open `config.js` and enter the URI of the mongo instance you are using where it says 'your-mongo-here'
5. back in the terminal, enter `node preload.js`. This will preload your database with the data that makes the app work. You can view the raw data itself in amps.json.
6. `npm start` then the app should begin running on port 3000. Open up your browser and have fun :-)

Please remember, this is an ultra simple application meant to show some basics of how Koa works from the perspective of being used for building server rendered dynamic websites and services. This is not intended to be seen as THE way to handle the task, it's just one way to get the job done. You will see how the following can be done...

1. Use HTML and CSS preprocessors.
2. Use a CSS framework.
3. How to mount and serve static content.
4. Routing
5. Error handling
6. Use Pug includes to modularize your view code.
7. Use Mongoose within the context of Koa.js.
8. How async/await works within Koa.

My hope is this can be helpful for people trying to get comfortable with Koa. If there are any problems, just let me know and I will get to you asap.