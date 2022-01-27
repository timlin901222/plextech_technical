# PlexTech Take-Home Technical Interview
Starter Code for the take-home portion of the PlexTech Technical Interview

API Spec: https://app.swaggerhub.com/apis-docs/AkshatJain1/Petstore

# Server Installation Instructions
1. Make sure up-to-date versions of Node and NPM are installed.
2. Run `npm install` in project directory 
3. Run `npm run dev` to run the server with Nodemon (hot-reload)

# Test Installation Instructions
1. Make sure at least Python 3.7 is installed
2. Run `pip install -r requirements.txt` in the `test` folder
3. Run `npm test` from the base folder. Starter test should succeed if the server is running

# Recommended Workflow
1. Define Pet Object Schema in `src/database/pets.js`
2. Add more test data in `src/database/sample_starter.json`
3. Complete the controller functions in `src/database/pets.js`
4. Specify route definitions in `src/index.js` using the controller functions

# Tips:
- You will have to use async/await in order to access POST/PUT body. Do some research here!
- Follow the spec very closely. Make sure the exact response parameters are being satisfied.
- Write function header comments to help your future self!
- Remember reusability and write modular code.
- Test with Postman, frequently!
- Use Google/Stack Overflow if you get stuck or have a weird error!
- Email technical@plextech.berkeley.edu if you have a question about the requirements