const {MongoClient} = require('mongodb');

async function main() { 


  const uri = "mongodb+srv://mario_MakerJS:fuckingCunts@cluster0-wgdn0.mongodb.net/test?retryWrites=true&w=majority"
  const client = new MongoClient(uri);

 
  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);

       await readMaps(client, "Default");
    }
    
   catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }



main().catch(console.error);

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases: ");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function readMaps(client, name) {
  const result = await client.db('game_db').collection('maps').findOne({name: name})

  if(result) {
    console.log(` found map with name: ${name}`)
    console.log(result);
}
  else {
    console.log(`NOT found ${name}`);
  }

  }
}
