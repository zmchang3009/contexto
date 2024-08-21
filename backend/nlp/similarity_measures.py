## Methods to calculate distance between two word embeddings
import numpy as np

def cosine_similarity(embedding1, embedding2):
    ret_value = 0.0

    vec1 = np.array(list(embedding1), dtype=np.float32)
    vec2 = np.array(list(embedding2), dtype=np.float32)
    
    dot_product = np.dot(vec1, vec2)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)

    ret_value = dot_product / (norm_vec1 * norm_vec2)

    return ret_value

