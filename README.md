# helps-backend
## Setting up the application
### Requirements:
- nodejs (See https://nodejs.org/en/download/)
- npm (This comes with nodejs download)
- yarn (See https://yarnpkg.com/lang/en/docs/install/#mac-stable)
- Docker, See:
    - __Mac__: https://docs.docker.com/docker-for-mac/install/
    - __Windows__: https://docs.docker.com/docker-for-windows/install/


### Running the application
1. From the command line, cd into the application directory 
2. Run: `yarn install`
3. Run: `yarn run start` (Expect the application to startup)
4. To validate the application is running, from the browser, navigate to: 'http://localhost:3001/api/v1/test' and expect to see 'Hello world'.


### Running Mongo with Docker
Once you have Docker installed and running, open up your terminal and navigate to the root of this application.
From the command line, run:
1. `docker-compose up` (Expect to see startup logs for Mongodb and Mongo Admin. You should now be able to access the database via this application, can verify through `yarn start`. __Optional:__ Add `-d` after up to run in the background.)
2. Navigate to 'http://localhost:1234/app/connection_list' (Expect to see adminMongo dashboard appear.)
3. Fill out the connection parameters as follows:
    - __Connection name:__ 'local'
    - __Connection string:__ 'mongodb://mongodb:27017/mytestdatabase'
4. Click 'Add connection'
You should now be able to click 'Connect' and see 'mytestdatabase' appear on the left panel. Here you will be able to view the collections and view documents saved in Mongo.


Once you have verified the database is displaying, you can then seed the database (prefill with random values) if you would like to view random session etc in the database. To do so, run `yarn seed` from the command line and expect it to output 'Done' after a few seconds.

#### Additional Information:
To stop the database running, use 'ctrl c' to exit, then run `docker-compose stop` to stop the containers running.
You can verify they have stopped by running `docker container ls` expecting nothing to appear. If you see the containers relevant to this application running, run `docker container stop <CONTAINER ID>`.


#### Using email
Current email is setup using nodemailer with a temporary gmail account. These details are saved in a .env file (see .env_template for what fields are needed in this .env file). To get credentials,
please ask someone in the group. __NOTE:__ Make sure these credentials are not saved in any other file and accidentally committed.

If you have any issues, please ask someone in the group :)
This application was setup with the help of the following resources:
- [production ready nodejs](https://itnext.io/production-ready-node-js-rest-apis-setup-using-typescript-postgresql-and-redis-a9525871407)
- [strongly typed models with mongoose and typescript](https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722)
- [Seeding mongodb the right way](https://medium.com/@pkosiec/seeding-mongodb-database-the-right-way-32a8a0e75490)