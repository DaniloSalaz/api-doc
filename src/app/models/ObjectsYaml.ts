
export class Property {
    name: string
    type: string
    minium?: number
    format: string
    description?: string
    ref?: string
    items?:{isRef: boolean, type: string, enum: any[]}
    enum?: any[]
}

export class Schema {
    name: string
    type: string
    required?: string[]
    properties?: Property[]
    xml?: {}
}