import * as bcodes from "./bytecodes"
import { OpCode, StackFrame, VirtualMachineContext } from "./context"
import { MValue } from "./mvalue"

export function loadSymbol
(stackFrame: StackFrame, sym: string): MValue | null {
  const r = stackFrame.var_table[sym]
  if (r === undefined) {
    if (stackFrame.method_pointer.env === null) {
      return null
    } else {
      return loadSymbol(stackFrame.method_pointer.env, sym)
    }
  } else {
    return r
  }
}

export function pop
(vmContext: VirtualMachineContext): MValue {
  const r = vmContext
      .stack_frame
      .opStack.value

    vmContext.stack_frame.opStack =
      vmContext.stack_frame.opStack.next
    return r
}

export function push
(vmContext: VirtualMachineContext, value: MValue) {
  vmContext
      .stack_frame
      .opStack = {
      value,
      next: vmContext
        .stack_frame
        .opStack
    }
}

export function write_local
(vmContext: VirtualMachineContext, sym: string, val: MValue) {
  vmContext.stack_frame.var_table[sym] = val
}

export function run (vmContext: VirtualMachineContext, opcode: OpCode): MValue {
  if (opcode.code === bcodes.load_const) {
    // @ts-ignore
    const r = vmContext.top_level_module_context.const_area[opcode.valu.Value]  // fixme : multi-type

  } else if (opcode.code === bcodes.load_lambda) {
    // @ts-ignore
    const r = vmContext.top_level_module_context.method_area[opcode.valu.Value] // fixme : multi-type
    return {
      value: r,
      type: null // FIXME: 等着LambdaTypeObject实现后传入
    }
  } else if (opcode.code === bcodes.load_symbol) {
    // @ts-ignore
    const name = vmContext.top_level_module_context.symbol_table[opcode.valu.Value] // fixme : multi-type
    const r = loadSymbol(vmContext.stack_frame, name)
    if (r === null) {
      throw new Error(`[MteRT]: Symbol '${name}' not found in:'\
                ${vmContext.top_level_module_context.module_path}:\
                ${opcode.line}`)
    } else {
      return r
    }
  } else if (opcode.code === bcodes.write_local_symbol) {
    let r: MValue = pop(vmContext)
    write_local(vmContext, vmContext
        .top_level_module_context
        // @ts-ignore
        .symbol_table[opcode.valu.Value], // fixme : multi-type
      r)
    return r
  } else if (opcode.code === bcodes.write_object_symbol) {
    // todo
  } else {
    throw new Error(`[MteRT]: Invalid bytecode '\
        ${opcode.code}' in:\
        ${vmContext.top_level_module_context.module_path}:\
        ${opcode.line}`)
  }
}
