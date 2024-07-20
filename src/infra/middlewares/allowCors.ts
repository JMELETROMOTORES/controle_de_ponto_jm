import { NextFunction, Request, Response } from 'express';

export default function allowCors(req: Request, res: Response, next: NextFunction): void {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Position,Useripaddress');
  res.header('Access-Control-Expose-Headers', 'X-Token');

  if (req.method === 'OPTIONS') {
    res.send();
    return;
  }

  next();
}