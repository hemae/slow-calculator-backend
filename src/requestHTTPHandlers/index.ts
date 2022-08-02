import {Response} from 'express'


export function error500(initiator: string, res: Response, e: any) {
    console.log(initiator.toUpperCase())
    console.log(e)
    res.status(500).json({message: `Something went wrong, ${e.message}`})
}

export function error401(res: Response, message?: string) {
    res.status(401).json({message: message || 'Unauthorized'})
}

export function error404(res: Response, message?: string) {
    res.status(404).json({message: message || 'Not found'})
}

export function error403(res: Response, message?: string) {
    res.status(403).json({message: message || 'No access'})
}

export function error400(res: Response, message?: string) {
    res.status(401).json({message: message || 'Error at client side'})
}

export function status201(res: Response, object: Record<string, any> | any[]) {
    res.status(201).json({data: object})
}

export function status200(res: Response, object: Record<string, any> | any[] | null) {
    res.json({data: object})
}

export function status200Message(res: Response, message: string) {
    res.json({message})
}
