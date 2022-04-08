import json
from User import User
from datetime import datetime, timezone, timedelta
from DynamoDBService import DynamoDBService


def lambda_handler(event, context):
    myname = event.get('id', '0')
    # tz_utc_8 = timezone(timedelta(hours=8))
    # thebithday = datetime.now().replace(tzinfo=tz_utc_8)

    # TODO implement
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps(employee,default = employee2json )
    # }


    dynamodb = DynamoDBService()

    result = dynamodb.operate_table(name=myname)
    return {
        'statusCode': 200,
        'body': result
    }


def user2json(u):
    print(u)
    return {
        'id': u.id,
        'name': u.name,
    }