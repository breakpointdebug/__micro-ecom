import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteProduct {
  @Field()
  productId: string;

  @Field({ nullable: true, defaultValue: null })
  deleteReason?: string;
}