import { LambdaStruct, VirtualMachineContext } from "./context"

export interface MType {
  name: string
  method_map: { [key: string]: LambdaStruct }
  method_list: LambdaStruct[]

  [key: string]: any
}

export const MNumberType: MType = {
  name: "number",
  method_map: {},
  method_list: []
}

export const MStringType: MType = {
  name: "string",
  method_map: {},
  method_list: []
}

export const MArrayType: MType = {
  name: "array",
  method_map: {},
  method_list: []
}

export const MMapType: MType = {
  name: "map",
  method_map: {},
  method_list: []
}

export interface MObject {
  map_table: { [key: string]: number }
  var_table: MValue[]
}

export const MLambdaType: MType = {
  name: "lambda",
  method_map: {},
  method_list: []
}

export type JSFunction =
  (vmContext: VirtualMachineContext, self: MValue, args: MValue[]) => MValue;

export const MTypeType: MType = {
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

export interface MValue {
  type: MType
  value?: Value
}
