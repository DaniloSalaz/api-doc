import { Path } from "./Path"

export class Tag {
    name: string
    description: string
    externalDocs: {description: string, url: string}
    paths: Path[]   
}