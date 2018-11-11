import { ActionType, createStandardAction } from 'typesafe-actions'

export const chip8InternalCpuActions = {
  assignToRegister: createStandardAction('chip8/opcodes/MOVE_Vx_Vy')<void>(),
  bitwiseOr: createStandardAction('chip8/opcodes/OR_Vx_Vy')<void>(),
  bitwiseAnd: createStandardAction('chip8/opcodes/AND_Vx_Vy')<void>(),
  randomBitwiseAnd: createStandardAction('chip8/opcodes/RND_Vx_nn')<number>(),
  bitwiseXor: createStandardAction('chip8/opcodes/XOR_Vx_Vy')<void>(),
  shiftRight: createStandardAction('chip8/opcodes/SHR_Vx_Vy')<void>(),
  shiftLeft: createStandardAction('chip8/opcodes/SHL_Vx_Vy')<void>(),
  registerEqualsConstant: createStandardAction('chip8/opcodes/SKE_Vx_nn')<void>(),
  registerDoesNotEqualConstant: createStandardAction('chip8/opcodes/SKNE_Vx_nn')<void>(),
  registersAreEqual: createStandardAction('chip8/opcodes/SKRE_Vx_Vy')<void>(),
  registersAreNotEqual: createStandardAction('chip8/opcodes/SKRNE_Vx_Vy')<void>(),
  setRegisterToConstant: createStandardAction('chip8/opcodes/LOAD_Vx_nn')<void>(),
  addConstantToRegister: createStandardAction('chip8/opcodes/ADD_Vx_nn')<void>(),
  returnFromSubroutine: createStandardAction('chip8/opcodes/RTS')<void>(),
  jumpToAddress: createStandardAction('chip8/opcodes/JUMP_nnn')<void>(),
  callSubroutine: createStandardAction('chip8/opcodes/CALL_nnn')<void>(),
  jumpToAddressPlusRegisterZero: createStandardAction('chip8/opcodes/JUMP_V0_nnn')<void>(),
  clearScreen: createStandardAction('chip8/opcodes/CLR')<void>(),
  drawGraphics: createStandardAction('chip8/opcodes/DRAW_Vx_Vy_N')<void>(),
  keyIsPressed: createStandardAction('chip8/opcodes/SKPR_Vx')<void>(),
  keyIsNotPressed: createStandardAction('chip8/opcodes/SKUP_Vx')<void>(),
  awaitKeyPress: createStandardAction('chip8/opcodes/KEYD_Vx')<void>(),
  addTwoRegisters: createStandardAction('chip8/opcodes/ADDR_Vx_Vy')<void>(),
  registerXMinusRegisterY: createStandardAction('chip8/opcodes/SUB_Vx_Vy')<void>(),
  registerYMinusRegisterX: createStandardAction('chip8/opcodes/SUBN_Vx_Vy')<void>(),
  setIndexRegisterToAddress: createStandardAction('chip8/opcodes/LOADI_nnn')<void>(),
  addRegisterXToIndexRegister: createStandardAction('chip8/opcodes/ADDI_Vx')<void>(),
  registerDump: createStandardAction('chip8/opcodes/STOR_Vx')<void>(),
  registerLoad: createStandardAction('chip8/opcodes/READ_Vx')<void>(),
  storeBCD: createStandardAction('chip8/opcodes/BCD_Vx')<void>(),
  storeSpriteLocation: createStandardAction('chip8/opcodes/LDSPR_Vx')<void>(),
  setRegisterToDelayTimer: createStandardAction('chip8/opcodes/MOVED_Vx')<void>(),
  setDelayTimerToRegister: createStandardAction('chip8/opcodes/LOADD_Vx')<void>(),
  setSoundTimerToRegister: createStandardAction('chip8/opcodes/LOADS_Vx')<void>()
}

export type Chip8InternalCpuAction = ActionType<typeof chip8InternalCpuActions>