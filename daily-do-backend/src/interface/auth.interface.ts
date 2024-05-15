export interface UserPayload {
  id: number;
  username: string;
}

export interface RequestWithUser extends Request {
  user: UserPayload;
}

export interface HttpExceptionResponse {
  statusCode: number;
  message: string | string[];
  error?: string | Object;
}
