# Hello there

This is a simple full-stack application where you fetch random cat pictures (one at a time) from an external API.

- Pretend that you are a logged-in user and you enjoy one of the images.
- You can 'like' it by clicking the button and it will be added to your user-page, 
where you can see all the pictures you liked.
- You can go to your user-page and click on a picture to 'unlike' it and it will be gone forever.

# How to use

There are 2 folders. Clone/download the project and open 2 consoles.
- On one console, write "cd backend" and then press enter to go inside that folder.
- Then write "npm install" to install the dependencies.
- Then write "npm start" to start the server

- On the other console, write "cd frontend" and then press enter to go inside that folder.
- Then write "npm install" to install the dependencies.
- Then write "npm start" to start the website

# How it works behind the scenes

- I have a frontend with REACT and backend with Express running in different ports and connected to a MongoDB database.
- 'Liking' the picture saves its URL and ID to a database by sending the information in a POST request to the backend API endpoint.
- When you open your user-page, it sends a GET request to retrieve all 'liked' pictures, which are served as JSON from the API, then mapped to output an image component with the saved URLs. This means I don't actually save the images, but the URLs, which are hosted in the external API.
- If you click on a picture in your user-area, you send a DELETE request to the API, which deletes it from the database and updates the state so it re-renders the pictures without refreshing.
