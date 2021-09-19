import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigw from '@aws-cdk/aws-apigateway'
import { HitCounter } from './hitcounter';

export class CdkTypescriptWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // scope = most cases define constructs within scope of current construct; use "this"
    // id = local id of construct so CDK calcs CF Logical ID for each resource in this scope
    // props = init properties specific to each construct
    // example: lambda.Function construct accepts "runtime", "code", "handler"
    // super invokes constructor of base class "cdk.Stack"

    // define an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,    // execution environment
      code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" directory
      handler: 'hello.handler'                // file is "hello", exported function name is "handler"
    });

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello
    });

    // define an API Gateway REST API resource backed by "hello" function
    // this adds 12 resources to our stack!
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: helloWithCounter.handler
    });

  }
  //end of constructor

}
