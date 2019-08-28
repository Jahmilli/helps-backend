const { Seeder } = require('mongo-seeding');
const path = require('path');

const config = {
    database: 'mongodb://localhost:27017/mytestdatabase',
    dropDatabase: true,
};

const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve("./data-import/"));

async function seed() {
    try {
        await seeder.import(collections);
    } catch (err) {
        // Handle errors
        console.log('an error occurred when importing', err);
    }
}

seed();