import { MValue, MObject } from "./mvalue"

type OpValue1 = {
    Value: number
}

type OpValue2 = {
    Value1: number
    Value2: number
}

export type OpCode = {
    line: number
    code: number
    valu: OpValue1 | OpValue2
}

export type ModuleContext = {
    module_filename: string
    symbol_table: string[]
    const_area: MValue[]
    method_area: LambdaStruct[]
    var_table: Map<string, MValue>
    global_method: LambdaStruct[]
    top_stack: OpStack
}

export type LambdaStruct = {
    module_pointer: ModuleContext
    self_pointer: MValue
    env?: StackFrame
    local_name_table: Array<string>
    bytecodes: OpCode[]
}

export type OpStack = {
    value: MValue
    next?: OpStack
}

export type StackFrame = {
    method_pointer: LambdaStruct
    var_table: Map<string, MValue>
    opStack?: OpStack
    bytecode_pointer: number
    next?: StackFrame
}

export type VirtualMachineContext = {
    top_level_module_context: ModuleContext
    module_table: Array<ModuleContext>
    stack_frame?: StackFrame
}

export const emptyVMContext = {
    top_level_module_context: null,
    module_table: [],
    stack_frame: null
}