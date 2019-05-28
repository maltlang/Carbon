export type MType = {
    name: string
}

export type MObject = {
    map_table: Map<string, number>
    var_table: MValue[]
}

export type Value = number | string | Array<any> | Map<string, any>| MType | MObject

export type MValue = {
    type: MType
    value: Value | void
}