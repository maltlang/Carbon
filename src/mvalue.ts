import { LambdaStruct, VirtualMachineContext } from "./context"

export type MType = {
    name: string
    method_map: Map<string, LambdaStruct>
    method_list: LambdaStruct[]
}

export const MNumberType = {
    name: "number",
    method_map: {},
    method_list: []
}

export const MStringType = {
    name: "string",
    method_map: {},
    method_list: []
}

export const MArrayType = {
    name: "array",
    method_map: {},
    method_list: []
}

export const MMapType = {
    name: "map",
    method_map: {},
    method_list: []
}

export type MObject = {
    map_table: Map<string, number>
    var_table: MValue[]
}

export const MLambdaType = {
    name: "lambda",
    method_map: {},
    method_list: []
}

export type JSFunction =
    (vmContext: VirtualMachineContext, self: MValue, args: MValue[]) => MValue

export const MTypeType = {
    name: "type",
    method_map: {},
    method_list: []
}

export type Value
    = number
    | string
    | Array<any>
    | Map<string, any>
    | LambdaStruct | JSFunction
    | MType
    | MObject

export type MValue = {
    type: MType
    value?: Value
}