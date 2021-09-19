import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

export interface HitCounterProps {
  /** the function for which we want to count url hits **/
  // we will "plug in" Lambda function here to get hit-counted
  downstream: lambda.IFunction;
}

// new construct class
export class HitCounter extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string, props: HitCounterProps) {
        super(scope, id);
        // props argument is type HitCounterProps

        // TODO
    }
}