import json
from User import User
from datetime import datetime, timezone, timedelta
from DynamoDBService import DynamoDBService
import urllib
import boto3

import numpy as np
import pandas as pd


def get_latent_factors(records):
    P = {}
    for record in records:
        vector = record['vector'].split(' ')
        P[record['id']] = [float(x) for x in vector]
    return P


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
    # get user ID
    userID = event.get('userid', '0')

    # # 1 & 2 Extract relevant metadata including S3URL out of input event
    # object_get_context = event["getObjectContext"]
    # request_route = object_get_context["outputRoute"]
    # request_token = object_get_context["outputToken"]
    # s3_url = object_get_context["inputS3Url"]
    #
    # # 3 - Download S3 File
    # response = http.request('GET', s3_url)
    #
    # original_object = response.data.decode('utf-8')
    # as_list = json.loads(original_object)
    # P, Q = get_latent_factors(as_list)


    # get S3 bucket
    s3 = boto3.client('s3')
    bucket = event['S3']['name']
    # user latent factors
    key = urllib.parse.unquote_plus(event['S3']['key1'], encoding='utf-8')
    response = s3.get_object(Bucket=bucket, Key=key)
    doc = json.loads(response)
    P = get_latent_factors(doc)
    # item latent factors
    key = urllib.parse.unquote_plus(event['S3']['key2'], encoding='utf-8')
    response = s3.get_object(Bucket=bucket, Key=key)
    doc = json.loads(response)
    Q = get_latent_factors(doc)

    # get the user latent factor
    if userID in P.keys():
        p = P[userID]
    else:
        F = 24
        p = [1 / F for i in range(F)]

    # recommend
    recommend_list = recommend_top_k(p, Q, 20)

    return {
        'statusCode': 200,
        'body': json.dumps(recommend_list)
    }