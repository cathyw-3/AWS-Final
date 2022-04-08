import boto3
from boto3 import Session
from boto3.dynamodb.conditions import Attr, Key
from datetime import datetime
import json


class DynamoDBService:
    def __init__(self):
        self.this_day = datetime.today()

    def get_service(self, table_name):
        # client = boto3.client('dynamodb', region_name='us-east-1',
        #                       aws_access_key_id=self.AWS_ACCESS_ID,
        #                       aws_secret_access_key=self.AWS_ACCESS_KEY)
        # dynamodb = boto3.resource('dynamodb', region_name='us-east-1',
        #                           aws_access_key_id=self.AWS_ACCESS_ID,
        #                           aws_secret_access_key=self.AWS_ACCESS_KEY)
        client = boto3.client('dynamodb', region_name='us-east-1')
        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        # get the operator object
        table_handle = dynamodb.Table(table_name)
        return table_handle

    def operate_table(self, table_name="User", id="0"):
        table_handle_h5_visit_info = self.get_service(table_name)

        """select according to the key"""
        response = table_handle_h5_visit_info.query(
            KeyConditionExpression=Key('id').eq(id)
        )

        # response
        print(type(response))
        items = response['Items']
        print(items)
        return json.dumps(items)