import {Request, Response, NextFunction} from 'express'


export type HandlerType = (req: Request, res: Response, next?: NextFunction) => Promise<any>
export type GControllerType = (req: Request, res: Response, ...middlewares: [HandlerType]) => Promise<void>
export type Controller = (req: Request, res: Response) => Promise<void>

export type Method =
    'get'
    | 'post'
    | 'put'
    | 'delete'

export type MyMethod =
    'gets'
    | Method

export const myMethods: MyMethod[] = [
    'gets',
    'get',
    'post',
    'put',
    'delete'
]

export type Controllers = Record<MyMethod, Controller>

