import {Tag} from './Tag';


export enum MetodosHttp {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    HEAD = "head",
    PATCH = "patch",
    OPTIONS = "options",
    CONNECT = "connect",
    TRACE = "trace"
    
}
export class Property {
    name: string
    type: string
    minium?: number
    format: string
    description?: string
    items?: string
    enum: { enum: [], type: string}
}
export class Schema {
    name: string
    type: string
    required?: string[]
    properties: Property[]
    xml?: {}
}

export class Content {
    type: string
    schema: any
}
export class RequestBody {
    description: string
    content: Content[]
    require:boolean

}
export class Response {
    code: number
    description: string
    content: Content[]
}
export class Parameter {
    name: string
    in: string
    description: string
    require: boolean
    style: string
    explode: boolean
    schema: any
}

export class Path {
    path: string
    metodo: MetodosHttp
    tags: string[]
    summary: string
    description: string
    operationId: string
    requestBody: RequestBody
    parameters: Parameter[]
    responses: Response
    deprecated:boolean
}