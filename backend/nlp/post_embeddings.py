## Script to post GloVe embeddings to MongoDB database in the 'embeddings' collection
## Each document will store one token and embedding pair
import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from load_embeddings import *
from word_checks import *

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')

def post_embeddings(db, collection, embeddings_dict):
    ## Establish connection to MongoDB
    ## Create a new client and connect to the server
    client = MongoClient(MONGO_URI)

    ## Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print('Successfully connected to MongoDB!')
        
        ## Establish connection to 'embeddings' collection
        db = client.get_database(db)
        collection = db.get_collection(collection)

        ## Add embeddings to database
        print(f'Adding {len(embeddings_dict)} embeddings...')
        for word, embedding in embeddings_dict.items():
            ## Check words before adding to database
            ## TODO: Add more checks / remark types if necessary
            remark = ''
            if not match_valid_regex(word):
                remark = 'invalid_regex'
            if is_stopword(word):
                remark = 'stopword'

            doc = {
                'word': word,
                'embedding': embedding,
                'remark': remark
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


if __name__ == '__main__':
    post_embeddings(load_embeddings_from_txt(count=10, exclude=['invalid_regex']))