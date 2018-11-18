import { ActionType, createAsyncAction, createStandardAction } from 'typesafe-actions'

export const chip8Actions = {
  loadFontset: createStandardAction('[chip8] LoadFontset')<void>(),
  loadGame: createAsyncAction(
    '[chip8] LoadGame - REQUEST',
    '[chip8] LoadGame - SUCCESS',
    '[chip8] LoadGame - FAILURE'
  )<string, Uint8Array, void>(),
  decrementTimers: createStandardAction('[chip8] DecrementTimers')<void>(),
  assignToRegister: createStandardAction('[chip8] MOVE_Vx_Vy')<void>(),
  bitwiseOr: createStandardAction('[chip8] OR_Vx_Vy')<void>(),
  bitwiseAnd: createStandardAction('[chip8] AND_Vx_Vy')<void>(),
  randomBitwiseAnd: createStandardAction('[chip8] RND_Vx_nn')<number>(),
  bitwiseXor: createStandardAction('[chip8] XOR_Vx_Vy')<void>(),
  shiftRight: createStandardAction('[chip8] SHR_Vx_Vy')<void>(),
  shiftLeft: createStandardAction('[chip8] SHL_Vx_Vy')<void>(),
  registerEqualsConstant: createStandardAction('[chip8] SKE_Vx_nn')<void>(),
  registerDoesNotEqualConstant: createStandardAction('[chip8] SKNE_Vx_nn')<void>(),
  registersAreEqual: createStandardAction('[chip8] SKRE_Vx_Vy')<void>(),
  registersAreNotEqual: createStandardAction('[chip8] SKRNE_Vx_Vy')<void>(),
  setRegisterToConstant: createStandardAction('[chip8] LOAD_Vx_nn')<void>(),
  addConstantToRegister: createStandardAction('[chip8] ADD_Vx_nn')<void>(),
  returnFromSubroutine: createStandardAction('[chip8] RTS')<void>(),
  jumpToAddress: createStandardAction('[chip8] JUMP_nnn')<void>(),
  callSubroutine: createStandardAction('[chip8] CALL_nnn')<void>(),
  jumpToAddressPlusRegisterZero: createStandardAction('[chip8] JUMP_V0_nnn')<void>(),
  clearScreen: createStandardAction('[chip8] CLR')<void>(),
  drawGraphics: createStandardAction('[chip8] DRAW_Vx_Vy_N')<void>(),
  keyIsPressed: createStandardAction('[chip8] SKPR_Vx')<void>(),
  keyIsNotPressed: createStandardAction('[chip8] SKUP_Vx')<void>(),
  awaitKeyPress: createStandardAction('[chip8] KEYD_Vx')<void>(),
  addTwoRegisters: createStandardAction('[chip8] ADDR_Vx_Vy')<void>(),
  registerXMinusRegisterY: createStandardAction('[chip8] SUB_Vx_Vy')<void>(),
  registerYMinusRegisterX: createStandardAction('[chip8] SUBN_Vx_Vy')<void>(),
  setIndexRegisterToAddress: createStandardAction('[chip8] LOADI_nnn')<void>(),
  addRegisterXToIndexRegister: createStandardAction('[chip8] ADDI_Vx')<void>(),
  registerDump: createStandardAction('[chip8] STOR_Vx')<void>(),
  registerLoad: createStandardAction('[chip8] READ_Vx')<void>(),
  storeBCD: createStandardAction('[chip8] BCD_Vx')<void>(),
  storeSpriteLocation: createStandardAction('[chip8] LDSPR_Vx')<void>(),
  setRegisterToDelayTimer: createStandardAction('[chip8] MOVED_Vx')<void>(),
  setDelayTimerToRegister: createStandardAction('[chip8] LOADD_Vx')<void>(),
  setSoundTimerToRegister: createStandardAction('[chip8] LOADS_Vx')<void>(),
  loadOpcode: createStandardAction('[chip8] LoadOpcode')<number>(),
  unknownOpcode: createStandardAction('[chip8] UnknownOpcode')<number>()
}

export type Chip8Action = ActionType<typeof chip8Actions>
