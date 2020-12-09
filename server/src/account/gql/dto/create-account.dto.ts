import { InputType } from '@nestjs/graphql';
import { BaseAccountDTO } from './account.dto';

@InputType()
export class CreateAccount extends BaseAccountDTO {};