## Script to post GloVe embeddings to MongoDB database in the 'embeddings' collection
## Each document will store one token and embedding pair
import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from load_embeddings import load_embeddings

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')

## Establish connection to MongoDB
## Create a new client and connect to the server
client = MongoClient(MONGO_URI)

## Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print('Pinged your deployment. You successfully connected to MongoDB!')
except Exception as e:
    print('Error connecting to MongoDB: ', e)


## Establish connection to 'embeddings' collection
try:
    db = client.get_database('test')
    collection = db.get_collection('embeddings')
    print('Successfully accessed "embeddings" collection')
except Exception as e:
    print('Error connecting to "embeddings" collection: ', e)


## Add embeddings to database
embeddings_dict = load_embeddings()

try:
    print(f'Adding {len(embeddings_dict)} embeddings...')
    for word, embedding in embeddings_dict.items():
        doc = {
            'word': word,
            'embedding': embedding
        }
        _ = collection.insert_one(doc)
except Exception as e:
    print('Error adding embeddings to database: ', e)
else:
    print('Embeddings successfully added! \nRetrieving data...')
    ## Printing the data inserted 
    cursor = collection.find() 
    for doc in cursor: 
        print(doc) 