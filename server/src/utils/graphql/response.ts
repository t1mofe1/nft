import { ObjectType, Field, registerEnumType } from "type-graphql";

enum ReturnCode {
  rcNone,
  rcSuccess,
  rcGeneralError,
}

@ObjectType()
export default class Response {
  @Field({ nullable: true })
  data: String;

  @Field({ nullable: true })
  errorMsg: String;

  @Field()
  returnCode: ReturnCode;
}

export class SuccessResponse extends Response {
  constructor(data: string = "") {
    super();
    this.data = data;
    this.returnCode = ReturnCode.rcSuccess;
  }
}

export class GeneralErrorResponse extends Response {
  constructor(exception: Error) {
    super();
    this.errorMsg =
      typeof exception === "string" ? exception : exception.message;
    this.returnCode = ReturnCode.rcGeneralError;
  }
}
