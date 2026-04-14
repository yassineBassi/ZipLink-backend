import { Matches } from 'class-validator';

export class CodeParamDto {
  @Matches(/^[a-zA-Z0-9]{8}$/, { message: 'code must be exactly 8 alphanumeric characters' })
  code: string;
}
