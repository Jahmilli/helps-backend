# helps-backend
## Setting up the application
### Requirements:
- nodejs (See https://nodejs.org/en/download/)
- npm (This comes with nodejs download)
- yarn (See https://yarnpkg.com/lang/en/docs/install/#mac-stable)


### Running the application
1. From the command line, cd into the application directory 
2. Run: `yarn install`
3. Run: `yarn run start` (Expect the application to startup)
4. To validate the application is running, from the browser, navigate to: 'http://localhost:3001/api/v1/test' and expect to see 'Hello world'.


#### Using email
Current email is setup using nodemailer with a temporary gmail account. These details are saved in a .env file (see .env_template for what fields are needed in this .env file). To get credentials,
please ask someone in the group. __NOTE:__ Make sure these credentials are not saved in any other file and accidentally committed.

If you have any issues, please ask someone in the group :)
This application was setup using:
- [production ready nodejs](https://itnext.io/production-ready-node-js-rest-apis-setup-using-typescript-postgresql-and-redis-a9525871407)
- [strongly typed models with mongoose and typescript](https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722)