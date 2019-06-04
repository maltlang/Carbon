import {
  VirtualMachineContext,
  OpCode,
  LambdaStruct,
  ModuleContext } from "./context"


export function
loadImages (vmContext: VirtualMachineContext, path: string) {
  // 留给月月姐姐写的function
}

export function
loadLambdas(input: string, modu: ModuleContext): LambdaStruct[] | void {
  
}

export function wcToOpCode(input: string): OpCode {
  const item = input.split(' ')
  let result: OpCode
  if (item.length = 2) {
    result = {
      line: Number(item[0]),
      code: Number(item[1]),
      valu: null,
    }
  } else if (item.length = 3) {
    result = {
      line: Number(item[0]),
      code: Number(item[1]),
      valu: {
        Value: Number(item[3]),
      },
    }
  } else if (item.length = 4) {
    result = {
      line: Number(item[0]),
      code: Number(item[1]),
      valu: {
        Value1: Number(item[3]),
        Value2: Number(item[4]),
      }
    }
  } else {
    throw new Error("[MteRT]: Invalid wordcode format")
  }
  return result
} 