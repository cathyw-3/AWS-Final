import numpy as np
import pandas as pd


def get_latent_factors(file):
    # get latent factors from txt
    data = []
    with open(file, 'r', encoding='utf-8') as f:
        line = f.readline()
        while line:
            line = line.strip()
            data.append(line.split())
            line = f.readline()
    # transfer the list to dictionary
    factors = {}
    for i in range(len(data)):
        ID = data[i][0]
        factor = [float(x) for x in data[i][1:]]
        factors[ID] = factor
    return factors


def recommend_top_k(p, Q, k):
    # compute the score
    score, p = {}, np.array(p)
    for itemID, q in Q.items():
        q = np.array(q)
        score[itemID] = p @ q
    # sort
    score = sorted(score.items(), key=lambda x:x[1], reverse=True)
    # get top k items
    recommend_list = [x[0] for x in score[0:k]]
    return recommend_list


def main():
    # build the latent factors dictionary
    P = get_latent_factors('user_latent_factor.txt')
    Q = get_latent_factors('item_latent_factor.txt')

    # obtain the user ID
    # TODO
    userID = '1'

    # get the user latent factor
    if userID in P.keys():
        p = P[userID]
    else:
        F = 40
        p = [1/F for i in range(F)]

    # recommend
    recommend_list = recommend_top_k(p, Q, 10)
    # TODO



if __name__ == '__main__':
    main()