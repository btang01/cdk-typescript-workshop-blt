// updates here constant update a corresponding hitcounter.js file

import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb'

export interface HitCounterProps {
  /** the function for which we want to count url hits **/
  // we will "plug in" Lambda function here to get hit-counted
  downstream: lambda.IFunction;
}

// new construct class
export class HitCounter extends cdk.Construct {
    /** allows accessing the counter function **/
    public readonly handler: lambda.Function;

    constructor(scope: cdk.Construct, id: string, props: HitCounterProps) {
        super(scope, id);
        // props argument is type HitCounterProps

        // define a DynamoDB table with "path" as a partition key
        const table = new dynamodb.Table(this, 'Hits', {
            partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
        });

        // define Lambda function bound to lambda/hitcounter.handler code
        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'hitcounter.handler',
            code: lambda.Code.fromAsset('lambda'),

            // wire Lambda environment variables to functionName and tableName of our resources
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName
            }
        });
    }
}