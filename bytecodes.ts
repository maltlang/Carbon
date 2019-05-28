// opcodes.rawMir
    const load_const          = 0
    const load_lambda         = 1
    const load_symbol         = 2
    const write_local_symbol  = 3
    const write_object_symbol = 4
    const get_method          = 5
    const copy_to_shared_area = 6
    const _delete             = 7
    const gc_new              = 8
    const call                = 9
    const _return             = 10

// opcodes.optimizMir
    const load_local_of_offset    = 11
    const load_object_of_offset   = 12
    const write_local_of_offset   = 13
    const write_object_of_offset  = 14
    const get_method_of_offset    = 15

//opcodes.optimizL2Mir
    const _throw  = 16
    const add     = 17
    const sub     = 18
    const mul     = 19
    const div     = 20
    const _mod    = 21

// append
    const call_of_offset = 22
