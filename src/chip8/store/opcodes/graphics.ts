import { Func1 } from 'redux'
import { Chip8, chip8Selectors, OpcodeFunc } from 'src/chip8/store'
import { chip8NumberOfColumns, chip8NumberOfRows, chip8SpriteWidth } from 'src/constants'
import { pipe } from 'src/functionalUtilities'

import { continueToNextInstruction, loadRegisters } from './helpers'

interface PixelMap {
  readonly [pixelIndex: number]: number
}

const updateGraphics = (pixelMap: PixelMap): OpcodeFunc => (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  graphics: Object.assign(Uint8Array.from({ length: 2048 }), chip8State.graphics, pixelMap)
})

const resetGraphics = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  graphics: Uint8Array.from({ length: 2048 })
})

const setDrawFlag = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  drawFlag: true
})

/*
  0x00E0
  Clears the screen.
*/
export const clearScreen = pipe(
  resetGraphics,
  setDrawFlag,
  continueToNextInstruction
)

/*
  0xDXYN
  Draws a sprite at coordinate (VX, VY) that has a width of 8 pixels and a height of N pixels. 
  Each row of 8 pixels is read as bit-coded starting from memory location I; I value doesn’t 
  change after the execution of this instruction. As described above, VF is set to 1 if any 
  screen pixels are flipped from set to unset when the sprite is drawn, and to 0 if that 
  doesn’t happen
*/
interface CoordinateOffset {
  readonly rowOffset: number
  readonly columnOffset: number
}

interface PixelUpdateResult {
  readonly index: number
  readonly result: number
  readonly collision: boolean
}

const getCoordinateOffsets = (chip8State: Chip8): ReadonlyArray<CoordinateOffset> => {
  const spriteHeight = chip8Selectors.opcodeOneDigitConstant(chip8State)
  const allColumnOffsets = Array.from(Array(chip8SpriteWidth).keys())
  const allRowOffsets = Array.from(Array(spriteHeight).keys())
  return [].concat.apply(
    [],
    allColumnOffsets.map((columnOffset: number) =>
      allRowOffsets.map((rowOffset: number) => ({
        columnOffset,
        rowOffset
      }))
    )
  )
}

const calculatePixelUpdate = (chip8State: Chip8): Func1<CoordinateOffset, PixelUpdateResult> => ({
  rowOffset,
  columnOffset
}: CoordinateOffset): PixelUpdateResult => {
  const coordinateX = chip8Selectors.opcodeRegisterXValue(chip8State)
  const coordinateY = chip8Selectors.opcodeRegisterYValue(chip8State)

  const xCoordinateToUpdate = (coordinateX + columnOffset) % chip8NumberOfColumns
  const yCoordinateToUpdate = (coordinateY + rowOffset) % chip8NumberOfRows
  const index = xCoordinateToUpdate + yCoordinateToUpdate * chip8NumberOfColumns
  const currentPixelState = chip8State.graphics[index]
  const memoryPixelRow = chip8State.memory[chip8State.indexRegister + rowOffset]
  const memoryPixel =
    (memoryPixelRow & (0x80 >>> columnOffset)) >>> (chip8SpriteWidth - 1 - columnOffset)

  return {
    index,
    result: currentPixelState ^ memoryPixel,
    collision: currentPixelState === 1 && memoryPixel === 1
  }
}

export const drawGraphics = (chip8State: Chip8): Chip8 => {
  const pixelUpdates = getCoordinateOffsets(chip8State).map(calculatePixelUpdate(chip8State))

  return pipe(
    updateGraphics(
      Object.assign({}, ...pixelUpdates.map(({ index, result }) => ({ [index]: result })))
    ),
    loadRegisters({ [0xf]: pixelUpdates.some(({ collision }) => collision) ? 0x1 : 0x0 }),
    setDrawFlag,
    continueToNextInstruction
  )(chip8State)
}
