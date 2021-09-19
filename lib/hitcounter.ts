import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

export interface HitCounterProps {
  /** the function for which we want to count url hits **/
  downstream: lambda.IFunction;
}