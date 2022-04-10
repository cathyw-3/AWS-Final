import json

import random
import numpy as np
import pandas as pd

# def get_latent_factors(file):
#     # get latent factors from txt
#     data = []
#     with open(file, 'r', encoding='utf-8') as f:
#         line = f.readline()
#         while line:
#             line = line.strip()
#             data.append(line.split())
#             line = f.readline()
#     # transfer the list to dictionary
#     factors = {}
#     for i in range(len(data)):
#         ID = data[i][0]
#         factor = [float(x) for x in data[i][1:]]
#         factors[ID] = factor
#     return factors


def get_latent_factors(file):
    with open(file, 'r') as f:
        records = json.load(f)
    P = {}
    for record in records:
        vector = record['vector'].split(' ')
        P[record['id']] = [float(x) for x in vector]
    return P


def latent_factor_model(records, P, Q, learning_rate, Lambda):
    # shuffle
    idx = [i for i in range(len(records))]
    random.shuffle(idx)

    # error for each epoch
    loss = 0
    for i in idx:
        [user, house, rui] = records[i]
        # compute the loss: eui = rui - Predict(u, i)
        u, i = np.array(P[user]), np.array(Q[house])
        eui = (rui - u @ i)**2 + Lambda * np.linalg.norm(u) + Lambda * np.linalg.norm(i)
        loss += eui

        # update the parameter by SGD:
        # for f in range(0, F):
        P[user] += learning_rate * (eui * Q[house] - Lambda * P[user])
        Q[house] += learning_rate * (eui * P[user] - Lambda * Q[house])

    return loss / len(records), P, Q


def print_latent_factors(file, P, Q):
    records = []
    for id, value in P.items():
        hash = {'type': 'user', 'id': id}
        hash['vector'] = ' '.join([str(x) for x in value])
        records.append(hash)
    for id, value in Q.items():
        hash = {'type': 'item', 'id': id}
        hash['vector'] = ' '.join([str(x) for x in value])
        records.append(hash)

    # print latent factors to json
    with open(file, 'w', encoding='utf-8') as f:
        f.write(json.dumps(records))

def main():
    # get the user and item list
    with open('./data/user_list.txt', 'r') as f:
        users = f.readline().split(' ')
    with open('./data/house_list.txt', 'r') as f:
        houses = f.readline().split(' ')

    # latent factor dimension
    F = 24

    # init the model
    # build the latent factors dictionary
    P = get_latent_factors('./data/user_latent_factor.json')
    Q = get_latent_factors('./data/item_latent_factor.json')

    # get the records
    records = pd.read_csv('./data/records.csv')

    # initialization
    P, Q = {}, {}
    for user in users:
        if user not in P.keys():
            P[user] = [random.random() for i in range(F)]
    for house in houses:
        if house not in Q.keys():
            Q[house] = [random.random() for i in range(F)]

    # parameters
    learning_rate = 0.001
    Lambda = 0.02
    num_epochs = 100

    # shuffle
    # Training
    for epoch in range(num_epochs):
        # train
        train_loss, P, Q = latent_factor_model(records, P, Q, learning_rate, Lambda)
        # # test
        # test_loss = latent_factor_model_test(records, P, Q, idx)

    # write to text
    print_latent_factors('./data/user_latent_factor.json', P)
    print_latent_factors('./data/item_latent_factor.json', Q)


if __name__ == '__main__':
    main()