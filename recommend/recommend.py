import json
from User import User
from datetime import datetime, timezone, timedelta
from DynamoDBService import DynamoDBService


import numpy as np
import pandas as pd

http = urllib3.PoolManager()


def get_latent_factors(records):
    P, Q = {}, {}
    for record in records:
        vector = record['vector'].split(' ')
        vector = [int(x) for x in vector]
        if record['type'] == "user":
            vector = record
            P[record['id']]  = vector
        if record['type'] == "item":
            Q[record['id']]  = vector
    return P, Q


def recommend_top_k(p, Q, k):
    # compute the score
    score, p = {}, np.array(p)
    for itemID, q in Q.items():
        q = np.array(q)
        score[itemID] = p @ q
    # sort
    score = sorted(score.items(), key=lambda x: x[1], reverse=True)
    # get top k items
    recommend_list = [x[0] for x in score[0:k]]
    return recommend_list


def lambda_handler(event, context):
    print(event)
    # TODO

    # 1 & 2 Extract relevant metadata including S3URL out of input event
    object_get_context = event["getObjectContext"]
    request_route = object_get_context["outputRoute"]
    request_token = object_get_context["outputToken"]
    s3_url = object_get_context["inputS3Url"]
    userID = object_get_context['userID']

    # 3 - Download S3 File
    response = http.request('GET', s3_url)

    original_object = response.data.decode('utf-8')
    as_list = json.loads(original_object)

    # build the latent factors dictionary
    # P = get_latent_factors('user_latent_factor.txt')
    # Q = get_latent_factors('item_latent_factor.txt')
    P, Q = get_latent_factors(as_list)

    # get the user latent factor
    if userID in P.keys():
        p = P[userID]
    else:
        F = 32
        p = [1 / F for i in range(F)]

    # recommend
    recommend_list = recommend_top_k(p, Q, 20)

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }