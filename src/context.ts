import { MValue } from "./mvalue"

interface OpValue1 {
  Value: number
}

interface OpValue2 {
  Value1: number
  Value2: number
}

export interface OpCode {
  line: number
  code: number
  valu: OpValue1 | OpValue2
}

export interface ModuleContext {
  module_path: string
  symbol_table: string[]
  const_area: MValue[]
  method_area: LambdaStruct[]
  global_method: LambdaStruct[]
}

export interface LambdaStruct {
  module_pointer: ModuleContext
  self_pointer: MValue
  env?: StackFrame
  local_name_table: Array<string>
  bytecodes: OpCode[]
}

export interface OpStack {
  value: MValue
  next?: OpStack
}

export interface StackFrame {
  method_pointer: LambdaStruct
  var_table: { [key: string]: MValue }
  opStack?: OpStack
  bytecode_pointer: number
  next?: StackFrame
}

export interface VirtualMachineContext {
  top_level_module_context: ModuleContext
  module_table: Array<ModuleContext>
  stack_frame?: StackFrame
}

export const emptyVMContext = {
  // @ts-ignore
  top_level_module_context: null, // fixme: properties have an `any` type
  // @ts-ignore
  module_table: [], // fixme: properties have an `any` type
  // @ts-ignore
  stack_frame: null // fixme: properties have an `any` type
}
