# Bug-Trax

## What is it

Bug-Trax is a **_Single Page Application_** **(SPA)** that allows users to open and close issues on a tracked project. Users log in using a _UserName_ and _Password_. This will bring them to the welcome screen where they can select several differnt options to proceed.

### - Project List

This is where you see the list of projects that you are currently tracking. From here the user can view issues as well as mark the open if they exist or closed if they are fixed. You can also add languages to the list of languages used in the project.

### - Add Project

This is where the user adds a project to the list of projects they are tracking. They enter the name of the project and a list of languages used in the project then add to be tracked.

### - ~~Find Projects (Not Implemented Yet)~~

### - Message Box

This is the in app messageing system. Users may send messages to one another. Here they can view recieved messages and can also send messages to other users. To be implemented an invite service to track a project, System messageing.

## Download

Create a clone by calling:

`git clone https://github.com/ShaneButtCodeNL/bug-tracker.git`

## To Run a demo on your machine

### Run the following . . .

You only need to install the dependentcys the first time.

` npm install react-scripts`

This may take a few mins. When it's done run a test Server.

`npm start`

### Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Important Notes on using the app

### 1. The API is simulated using reacts **local-storage** . This means the data is stored on your browser even if you close/refresh the page or even stop and restart the server.

### 2. On the splash page there is a button under the login form that says ** RESET STORAGE **. This will clear all locally stored data on the browser, including users, projects, and messages. I recommend doing this if you plan to remove the demo just to keep it clean.

### 3. API calls have a delay of 150ms-300ms just to mimic real API calls.

That's it!! Have Fun !! :sunglasses: :sunglasses: :sunglasses:
