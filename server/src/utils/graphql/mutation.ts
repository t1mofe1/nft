import Response, { 
    SuccessResponse,
    GeneralErrorResponse } from './response';

export const InvokeMutation =  async (fn: () => Promise<any>):Promise<Response> =>  {
    try {
        const data = await fn();
        return new SuccessResponse(data);
    }
    catch(e: any) {
        console.log(e);
        return new GeneralErrorResponse(e)
    }
}