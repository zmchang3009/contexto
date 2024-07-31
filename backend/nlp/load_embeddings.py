## Load embeddings from txt to a dict
import numpy as np
import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from word_checks import *

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')

## Method to load embeddings from database, filtering based on remarks
def load_embeddings_from_db(client, db, collection, count=None, exclude=[]):
    print('Retrieving embeddings from database...')
    db_embeddings = {}
    client = MongoClient(MONGO_URI)
    counter = count if count else 1

    try:
        ## Send a ping to confirm a successful connection
        client.admin.command('ping')
        print('Successfully connected to MongoDB!')

        ## Get embeddings collection as dict
        db = client.get_database(db)
        collection = db.get_collection(collection)

        for doc in collection.find():
            ## Exclude words if necessary
            if 'stopwords' in exclude and is_stopword(doc['word']):
                continue
            if 'invalid_regex' in exclude and not match_valid_regex(doc['word']):
                continue

            db_embeddings[doc['word']] = doc['embedding']
            
            ## If count is specified, check break condition
            if count:
                counter -= 1
            if counter == 0:
                break
        print('Successfully loaded embeddings from database')
    except Exception as e:
        print('Error loading embeddings from database: ', e)

    return db_embeddings


## Method to load embeddings from offline GloVe txt
def load_embeddings_from_txt(count=None, exclude=[]):
    print('Loading GloVe model...')
    glove_vocab = {}
    counter = count if count else -1

    try:
        with open('backend/nlp/glove_6B_50d.txt', 'r', encoding='utf-8') as f:
            for line in f:
                split_line = line.split()
                ## Get word and embedding (as list of floats)
                word = split_line[0]
                embedding = np.array(split_line[1:], dtype=np.float64).tolist()

                ## Exclude words if necessary
                if 'stopwords' in exclude and is_stopword(word):
                    continue
                if 'invalid_regex' in exclude and not match_valid_regex(word):
                    continue

                glove_vocab[word] = embedding 
                
                ## If count is specified, check break condition
                if count:
                    counter -= 1
                if counter == 0:
                    break
    except FileNotFoundError:
        print('Error: GloVe embeddings txt file not found')
    except:
        print('Error loading embeddings')
    else:
        print(f'{len(glove_vocab)} words loaded')

    return glove_vocab



if __name__ == '__main__':
    embeddings = load_embeddings_from_txt(count=10, exclude=['invalid_regex'])
    print(list(embeddings.keys()))