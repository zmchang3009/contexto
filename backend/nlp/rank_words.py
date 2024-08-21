## Script used to rank words according to their distance to the target
## To be executed when generating puzzles
from similarity_measures import *
from word_checks import *
from load_embeddings import *

SAMPLE_TARGET = 'one'


def rank_words(target, embeddings, measure='cosine_similarity'):
    ret_ranked_words = []

    try:       
        ## Check if target is in embeddings source
        if target not in embeddings:
            raise Exception('Invalid target word')

        ## Calculate similarity scores for all words
        similarity_scores = {} ## key: value = other_word: similarity_to_target
        if measure == 'cosine_similarity':
            print('Calculating cosine similarities...')
            for other_word in embeddings.keys():
                if target == other_word:
                    continue
                score = cosine_similarity(embeddings[target], embeddings[other_word])
                similarity_scores[other_word] = score
        else:
            raise Exception('Invalid similarity measure')

        ## Rank words and add the target itself to the front
        ret_ranked_words = [target] + sorted(similarity_scores.keys(), key=lambda word: similarity_scores[word], reverse=True)

    except Exception as e:
        print('Error ranking words: ', e)


    return ret_ranked_words


if __name__ == '__main__':
    embeddings = load_embeddings_from_db('test', 'embeddings', exclude=['stopwords'])
    print(rank_words(SAMPLE_TARGET, embeddings))