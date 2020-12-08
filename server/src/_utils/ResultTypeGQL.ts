import { Field, ObjectType } from "@nestjs/graphql";
import { UpdateResult } from 'typeorm';

@ObjectType('ResultType')
export class Result {

  constructor(message: UpdateResult) {
    this.message = message;
  }

  @Field()
  message: UpdateResult;
}