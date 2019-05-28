// opcodes.rawMir
    export const load_const          = 0
    export const load_lambda         = 1
    export const load_symbol         = 2
    export const write_local_symbol  = 3
    export const write_object_symbol = 4
    export const get_method          = 5
    export const copy_to_shared_area = 6
    export const _delete             = 7
    export const gc_new              = 8
    export const call                = 9
    export const _return             = 10

// opcodes.optimizMir
export const load_local_of_offset    = 11
export const load_object_of_offset   = 12
export const write_local_of_offset   = 13
export const write_object_of_offset  = 14
export const get_method_of_offset    = 15

//opcodes.optimizL2Mir
export const _throw  = 16
export const add     = 17
export const sub     = 18
export const mul     = 19
export const div     = 20
export const _mod    = 21

// append
export const call_of_offset = 22
