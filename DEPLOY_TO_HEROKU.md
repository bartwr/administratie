# Deploy to Heroku

Heroku is a cloud based hosting platform that makes it easy to auto deploy your app. As soon as there's a GitHub update to the master branch, a new deployment is made. This makes deployment way easier.

I choose Heroku because of the low cost (7 EUR per month), and because I did not try lots of others - Heroku works for me so far.

In this document I describe how to start your Heroku project and set up this `administratie` github repo for auto deployment.

## Step 1: Create an account

1. Go to http://heroku.com/
2. Click [Sign up](https://signup.heroku.com/?c=70130000001x9jFAAQ)
3. Follow the steps

## Step 2: Create a new app

1. Click **New** -> **Create new app**
2. As app name, fill in `administratie` (this just an example, fill in whatever you want)
3. Change whatever you want. Then, click **Create app**   

## Step 3: Create a MLab account & database

We are going to use a mongodb database. This is used by the Meteor app.

I don't describe all detailled steps for this section. Do this:

- Create an account for [mlab.com](http://mlab.com/)
- Create a new database by clicking on **Create new**
- Choose **Sandbox** for testing purposes -> Click the **Continue** button
- Choose you region, for example **Europe**
- Choose your database name, for example **administratie**
- Now the database is created, click the **Users** tab & create a user for your db

You're done. Let's go to the next step.

## Step 4: Configure the app for Meteor

This repository uses Meteor. Therefor you have to configure some things.

1. Click on the **Settings** tab.
2. Click the **Reveal Config Vars** button
3. Fill in the followingf config vars:

- ENV: `PROD`
- METEOR_APP_DIR: `./`
- MOLLIE_API_KEY: `Your Mollie API key`
- MONGO_URL: `mongodb://administratie:YOUR_PASSWORD@ds131711.mlab.com:31711/administratie` (example, see step 3)
- ROOT_URL: `https://your-web.address`

4. Add two build packs:

- `heroku/nodejs`
- `https://github.com/AdmitHub/meteor-buildpack-horse.git`

That's it!

## Step 5: Connect your GitHub account

Now we want to deploy a new version of the app, by getting the code from GitHub and deploy it to Heroku.

1. In Heroku, click the **Deploy** tab
2. Near **Deployment method**, connect your GitHub account
3. Once configured at step 2, near **Manual deploy**, deploy the `master` branch

If everything is right, the app is now deployed and reachable via the URL of your Heroku instance. Enjoy!
