## Functions to help check the words in GloVe vocab
import re
from nltk.corpus import stopwords


## Use regex to filter out words with numbers and punctuation
def match_valid_regex(word: str):
    ret_output = False
    valid_regex = re.compile(r'^[a-zA-Z]+$')

    if valid_regex.match(word):
        ret_output = True

    return ret_output


## Check if word is a stopword
def is_stopword(word: str):
    ret_output = False
    all_stopwords = set(stopwords.words('english'))

    if word in all_stopwords:
        ret_output = True

    return ret_output


## Lemmatization

## Proper nouns
