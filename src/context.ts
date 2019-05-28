import { MValue } from "./mvalue"

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

export type LambdaStruct = {
    local_name_table: Array<string>
    bytecodes: OpCode[]
}

export type ModuleContext = {
    module_filename: string
    symbol_table: string[]
    const_area: any[]
    method_area: LambdaStruct[]
    global_method: LambdaStruct[]
}

export type OpStack = {
    value: MValue
    next?: OpStack
}

export type StackFrame = {
    method_pointer: LambdaStruct
    opStack: OpStack
    bytecode_pointer: number
    next?: StackFrame
}

export type VirtualMachineContext = {
    module_table: Array<ModuleContext>
    stack_frame: StackFrame
}
