import { Request, Response } from 'express';

export interface ContextRequest extends Request {
  userId?: string;
}

export interface Context {
  req: ContextRequest;
  res: Response;
}

export interface Info<VariableValues = any> {
  fieldName: string;
  fieldNodes: any[];
  returnType: any;
  parentType: any;
  path: {
    prev: any;
    key: string;
  };
  operation: {
    kind: string;
    operation: 'query' | 'mutation';
    name: any;
    variableDefinitations: any[];
    directives: any[];
    selectionSet: any;
    loc: any;
  }
  variableValues: VariableValues;
  cacheControl: {
    setCacheHint: any;
    cacheHine: any;
  }
}

export interface TokenPayload {
  user: {
    email: string;
    id: string;
  }
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}
