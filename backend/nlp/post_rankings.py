## Script to create word rankings based on a target and post to database
## Each collection is a new puzzle, and each doc is a word with its rank
import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from datetime import datetime


load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')


## Method that posts a list of ranked words to the database
## TODO: Create index using text / rank?
def post_rankings(db, collection, ranked_words):
    ## Establish connection to MongoDB
    ## Create a new client and connect to the server
    client = MongoClient(MONGO_URI)

    ## Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print('Successfully connected to MongoDB!')
        
        ## Establish connection to relevant collection
        db = client.get_database(db)
        collection = db.get_collection(collection)

        ## Create ranked_word objects
        docs = []
        for idx in range(len(ranked_words)):
            docs.append({
                'text': ranked_words[idx], 
                'rank': idx + 1 ## Rankings start from 1
            })

        ## Add rankings to database
        print(f'Adding {len(docs)} ranked words to database...')
        _ = collection.insert_many(docs)

    except Exception as e:
        print('Error adding embeddings to database: ', e)
    
    else:
        print('Embeddings successfully added! \nRetrieving data...')
        ## Printing the data inserted 
        cursor = collection.find(limit=5) 
        for doc in cursor: 
            print(doc) 


if __name__ == '__main__':
    from rank_words import *
    from load_embeddings import *
    
    embeddings = load_embeddings_from_db('test', 'embeddings', exclude=['stopwords'])
    ranked_words = rank_words('one', embeddings)
    post_rankings('puzzles', datetime.now().strftime('%d-%m-%Y'), ranked_words)