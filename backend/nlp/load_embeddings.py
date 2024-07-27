## Load embeddings from txt to a dict
import numpy as np

def load_embeddings(count=10):
    print('Loading GloVe model...')
    glove_vocab = {}

    try:
        with open('backend/nlp/glove_6B_50d.txt', 'r', encoding='utf-8') as f:
            for line in f:
                split_line = line.split()
                ## Get word and embedding (as list of floats)
                word = split_line[0]
                embedding = np.array(split_line[1:], dtype=np.float64).tolist()
                glove_vocab[word] = embedding 
                
                count -= 1
                if count == 0:
                    break
    except FileNotFoundError:
        print('Error: GloVe embeddings txt file not found')
    except:
        print('Error loading embeddings')
    else:
        print(f'{len(glove_vocab)} words loaded')

    return glove_vocab


if __name__ == '__main__':
    embeddings = load_embeddings()
    print(list(embeddings.keys()))