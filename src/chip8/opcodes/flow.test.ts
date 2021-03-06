import { chip8InitialState, parsedOpcodeInitialState } from 'src/chip8/types'
import { updateUint8Array } from 'src/functional'

import {
    callSubroutine, jumpToAddress, jumpToAddressPlusRegisterZero, returnFromSubroutine
} from './flow'

describe('flow', () => {
  describe('returnToSubroutine', () => {
    const currentState = {
      ...chip8InitialState,
      stackPointer: 2,
      stack: Uint16Array.from([0x150, 0x2f2]),
      programCounter: 0x316
    }

    const { stack, stackPointer, programCounter } = returnFromSubroutine(currentState)

    it('removes the last address from the stack', () => {
      expect(stack[stack.length - 1]).toBe(0x150)
    })

    it('decreases the length of the stack by one', () => {
      expect(stack.length).toBe(1)
    })

    it('decrements the stack pointer', () => {
      expect(stackPointer).toBe(1)
    })

    it('returns from the subroutine', () => {
      expect(programCounter).toBe(0x2f4)
    })
  })

  describe('jumpToAddress', () => {
    const currentState = {
      ...chip8InitialState,
      programCounter: 0x3ff
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, threeDigitConstant: 0x1ef }

    const { programCounter } = jumpToAddress(currentState, parsedOpcode)

    it('jumps to address NNN', () => {
      expect(programCounter).toBe(0x1ef)
    })
  })

  describe('callSubroutine', () => {
    const currentState = {
      ...chip8InitialState,
      stackPointer: 1,
      stack: Uint16Array.from([0x210]),
      programCounter: 0x220
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, threeDigitConstant: 0x25f }

    const { stack, stackPointer, programCounter } = callSubroutine(currentState, parsedOpcode)

    it('stores the current address in the stack', () => {
      expect(stack[stack.length - 1]).toBe(0x220)
    })

    it('increases the length of the stack by one', () => {
      expect(stack.length).toBe(2)
    })

    it('increments the stack pointer', () => {
      expect(stackPointer).toBe(2)
    })

    it('jumps to the given address', () => {
      expect(programCounter).toBe(0x25f)
    })
  })

  describe('jumpToAddressPlusRegisterZero', () => {
    const currentState = {
      ...chip8InitialState,
      vRegisters: updateUint8Array(chip8InitialState.vRegisters, {
        0: 0x51
      }),
      programCounter: 0x12a
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, threeDigitConstant: 0x1fa }

    const { programCounter } = jumpToAddressPlusRegisterZero(currentState, parsedOpcode)

    it('jumps to address NNN + V0', () => {
      expect(programCounter).toBe(0x24b)
    })
  })
})
