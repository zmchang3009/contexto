## Script to create word rankings based on a target and post to database
## Each collection is a new puzzle, and each doc is a word with its rank
import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from datetime import datetime


## Method that posts a list of ranked words to the database
## TODO: Create index using text / rank?
def post_rankings(client, db, collection, ranked_words):  

    try:
        ## Send a ping to confirm a successful connection
        client.admin.command('ping')
        print('Pinged! Successfully connected to MongoDB!')
        
        ## Establish connection to relevant collection
        db = client.get_database(db)
        collection = db.get_collection(collection)

        print(f'Adding {len(ranked_words)} ranked words to database...')
        for idx in range(len(ranked_words)):
            doc = {
                'text': ranked_words[idx], 
                'rank': idx + 1 ## Rankings start from 1
            }

            ## Add rankings to database
            _ = collection.insert_one(doc)

    except Exception as e:
        print('Error adding rankings to database: ', e)
    
    else:
        print('Rankings successfully added! \nRetrieving data...')
        ## Printing the data inserted 
        cursor = collection.find(limit=5) 
        for doc in cursor: 
            print(doc)


if __name__ == '__main__':
    from rank_words import *
    from load_embeddings import *

    load_dotenv()
    MONGO_URI = os.getenv('MONGO_URI')

    ## Create a new client and connect to the server
    client = MongoClient(MONGO_URI)
    
    embeddings = load_embeddings_from_db(client, 'test', 'embeddings', exclude=['stopwords'])
    ranked_words = rank_words('one', embeddings)
    post_rankings('puzzles', datetime.now().strftime('%d-%m-%Y'), ranked_words)