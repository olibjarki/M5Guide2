'use server'

import {MongoClient, ServerApiVersion} from 'mongodb'
    
type Greeting = {
  _id: string;
  greeting: string;
}

const uri = process.env.MONGODB_URI
if(!uri){
    throw new Error("environment variable MONGODB_URI is not defined");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function getGreetings() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Querying our database
    const cursor = await client.db("test").collection("greetings").find();
    const array = await cursor.toArray()
    
    // Convert _id to string so it can be sent to the client
    return array.map(doc => ({
      ...doc,
      _id: doc._id.toString()
    } as Greeting));

  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}
