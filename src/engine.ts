import { VirtualMachineContext, OpCode } from "./context"
import { MValue } from "./mvalue"
import { load_const } from "./bytecodes";


export function run(vmContext: VirtualMachineContext, opcode: OpCode): MValue | void {
    if (opcode.code == load_const) {

    }
    null
}