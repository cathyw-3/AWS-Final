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


def print_latent_factors(file, P):
    records = []
    for id, value in P.items():
        hash = {'id': id}
        hash['vector'] = ' '.join([str(x) for x in value])
        records.append(hash)

    # print latent factors to json
    with open(file, 'w') as f:
        f.write(json.dumps(records))

def main():
    # get the user and item list
    # TODO
    users = ['1', '2']
    houses = ['1', '2']

    # latent factor dimension
    F = 24

    # init the model
    # build the latent factors dictionary
    P = get_latent_factors('./data/user_latent_factor.json')
    Q = get_latent_factors('./data/item_latent_factor.json')
    print(P)
    print(Q)

    # get the records
    # TODO
    records = [['1', '1', 4]]

    # # initialization
    # P, Q = {}, {}
    # users, houses = [str(x) for x in range(10)], [str(x) for x in range(10)]
    # for user in users:
    #     if user not in P.keys():
    #         P[user] = [1/F for i in range(F)]
    # for house in houses:
    #     if house not in Q.keys():
    #         Q[house] = [1/F for i in range(F)]
    #
    #
    # # write to text
    # print_latent_factors('./data/user_latent_factor.json', P)
    # print_latent_factors('./data/item_latent_factor.json', Q)


if __name__ == '__main__':
    main()