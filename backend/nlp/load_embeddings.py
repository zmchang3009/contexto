## Load embeddings from txt to a dict
## TODO: Add checks to filter for only relevant words
import numpy as np

def load_embeddings():
    print('Loading GloVe model...')
    glove_vocab = {}

    try:
        with open('backend/nlp/glove_6B_50d.txt', 'r') as f:
            for line in f:
                split_line = line.split()
                ## Get word and embedding (as list of floats)
                word = split_line[0]
                embedding = np.array(split_line[1:], dtype=np.float64).tolist()
                glove_vocab[word] = embedding 
    except FileNotFoundError:
        print('Error: GloVe embeddings txt file not found')
    else:
        print(f'{len(glove_vocab)} words loaded')

    return glove_vocab