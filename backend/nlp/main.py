## Main script for generating puzzles
import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from datetime import datetime

from load_embeddings import *
from post_embeddings import *
from rank_words import *
from post_rankings import *


load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
SAMPLE_TARGET = 'one'
EMBEDDINGS_DB, EMBEDDINGS_COL = 'test', 'temp_embeddings'
PUZZLES_DB, PUZZLES_COL = 'puzzles', f'temp_puzzle_{datetime.now().strftime("%d-%m-%Y")}'


def generate_puzzle(target, client, embeddings_source='db', exclude=['invalid_regex', 'stopwords'], \
                    post_txt_embeddings=False):
    ## Load and post embeddings to database if necessary. Include stopwords
    if post_txt_embeddings:
        txt_embeddings = load_embeddings_from_txt(count=None, exclude=['invalid_regex'])
        post_embeddings(client, EMBEDDINGS_DB, EMBEDDINGS_COL, txt_embeddings)
    
    ## Get word embeddings to be ranked
    embeddings = {}
    if embeddings_source == 'db':
        embeddings = load_embeddings_from_db(client, EMBEDDINGS_DB, EMBEDDINGS_COL, \
                                             count=None, exclude=exclude)
    elif embeddings_source == 'txt':
        embeddings = load_embeddings_from_txt(count=None, exclude=exclude)

    ## Rank words against target
    ranked_words = rank_words(target, embeddings, measure='cosine_similarity')
    post_rankings(client, PUZZLES_DB, PUZZLES_COL, ranked_words)

    client.close()


if __name__ == '__main__':
    ## Create a new client and connect to the server
    client = MongoClient(MONGO_URI)

    ## Check index information
    # db = client.get_database(PUZZLES_DB)
    # collection = db.get_collection(PUZZLES_COL)
    # print(collection.index_information())

    generate_puzzle(SAMPLE_TARGET, client, post_txt_embeddings=False)