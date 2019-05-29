import { VirtualMachineContext, OpCode, StackFrame } from "./context"
import { MValue } from "./mvalue"
import * as bcodes from "./bytecodes";

export function loadGlobalSymbol(vmContext: VirtualMachineContext, sym: string): MValue | null {
    const r =vmContext
    .top_level_module_context
    .var_table[name]
    if (r == undefined) {
        return null;
    } else {
        return r;
    }
}

export function loadLocalSymbol
    (stackFrame: StackFrame, sym: string): MValue | null {
    const r = stackFrame.var_table[sym]
    if (r == undefined) {
        if (stackFrame.method_pointer.env == null) {
            return null
        } else {
            return loadLocalSymbol(stackFrame.method_pointer.env, sym)
        }
    } else {
        return r
    }
}

export function loadSymbol
    (vmContext: VirtualMachineContext, sym: string): MValue | null {
    if (vmContext.stack_frame == null) {
        return loadGlobalSymbol(vmContext, sym)
    } else {
        const r = loadLocalSymbol(vmContext.stack_frame, sym)
        if (r != null) {
            return r
        } else {
            return loadGlobalSymbol(vmContext, sym)
        }
    }
}

export function pop
(vmContext: VirtualMachineContext): MValue {
    if (vmContext.stack_frame == null) {
        const r = vmContext
        .top_level_module_context
        .top_stack
        .value

        vmContext.top_level_module_context.top_stack = 
        vmContext.top_level_module_context.top_stack.next
        return r
    } else {
        const r = vmContext
        .stack_frame
        .opStack.value

        vmContext.stack_frame.opStack =
        vmContext.stack_frame.opStack.next
        return r
    }
}

export function push
(vmContext: VirtualMachineContext, value: MValue) {
    if (vmContext.stack_frame == null) {
        vmContext
            .top_level_module_context
            .top_stack = {
            value: value,
            next: vmContext
                .top_level_module_context
                .top_stack
            }
    } else {
        vmContext
        .stack_frame
        .opStack = {
            value: value,
            next: vmContext
                .stack_frame
                .opStack
            }
    }
}

export function write_local
    (vmContext: VirtualMachineContext, sym: string, val: MValue) {
    if (vmContext.stack_frame == null) {
        vmContext.top_level_module_context.var_table.set(sym, val)
    } else {
        vmContext.stack_frame.var_table.set(sym, val)
    }
}

export function run(vmContext: VirtualMachineContext, opcode: OpCode): MValue {
    if (opcode.code === bcodes.load_const) {
        const r = vmContext.top_level_module_context.const_area[opcode.valu['Value']]

    } else if (opcode.code === bcodes.load_lambda) {
        const r = vmContext.top_level_module_context.method_area[opcode.valu['Value']]
        return {
            value: r,
            type: null //FIXME: 等着LambdaTypeObject实现后传入
        }
    } else if (opcode.code === bcodes.load_symbol) {
        const name = vmContext.top_level_module_context.symbol_table[opcode.valu['Value']]
        const r = loadSymbol(vmContext, name);
        if (r == null) {
            throw `[MteRT]: Symbol '${name}' not found in:'\
                ${vmContext.top_level_module_context.module_filename}:\
                ${opcode.line}`;
        } else {
            return r
        }
    } else if (opcode.code === bcodes.write_local_symbol) {
        let r: MValue = pop(vmContext)
        write_local(vmContext, vmContext
            .top_level_module_context
            .symbol_table[opcode.valu['Value']],
            r)
        return r
    } else if (opcode.code == bcodes.write_object_symbol) {

    } else {
        throw `[MteRT]: Invalid bytecode '\
        ${opcode.code}' in:\
        ${vmContext.top_level_module_context.module_filename}:\
        ${opcode.line}`
    }
}