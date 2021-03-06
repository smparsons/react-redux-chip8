import { Chip8, Func1, ParsedOpcode } from 'src/chip8/types'
import { chip8NumberOfColumns, chip8NumberOfRows, chip8SpriteWidth } from 'src/constants'
import { updateUint8Array } from 'src/functional'

/*
  0x00E0
  Clears the screen.
*/
export const clearScreen = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  graphics: Uint8Array.from({ length: 2048 }),
  programCounter: chip8State.programCounter + 0x2
})

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

const getCoordinateOffsets = (spriteHeight: number): ReadonlyArray<CoordinateOffset> => {
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

const calculatePixelUpdate = (
  chip8State: Chip8,
  coordinateX: number,
  coordinateY: number
): Func1<CoordinateOffset, PixelUpdateResult> => ({ rowOffset, columnOffset }: CoordinateOffset): PixelUpdateResult => {
  const { graphics, memory, indexRegister } = chip8State

  const xCoordinateToUpdate = (coordinateX + columnOffset) % chip8NumberOfColumns
  const yCoordinateToUpdate = (coordinateY + rowOffset) % chip8NumberOfRows
  const index = xCoordinateToUpdate + yCoordinateToUpdate * chip8NumberOfColumns
  const currentPixelState = graphics[index]
  const memoryPixelRow = memory[indexRegister + rowOffset]
  const memoryPixel = (memoryPixelRow & (0x80 >>> columnOffset)) >>> (chip8SpriteWidth - 1 - columnOffset)

  return {
    index,
    result: currentPixelState ^ memoryPixel,
    collision: currentPixelState === 1 && memoryPixel === 1
  }
}

export const drawGraphics = (chip8State: Chip8, { oneDigitConstant, registerX, registerY }: ParsedOpcode): Chip8 => {
  const { graphics, vRegisters, programCounter } = chip8State
  const coordinateX = vRegisters[registerX]
  const coordinateY = vRegisters[registerY]
  const pixelUpdates = getCoordinateOffsets(oneDigitConstant).map(
    calculatePixelUpdate(chip8State, coordinateX, coordinateY)
  )

  return {
    ...chip8State,
    graphics: updateUint8Array(graphics, ...pixelUpdates.map(({ index, result }) => ({ [index]: result }))),
    vRegisters: updateUint8Array(vRegisters, {
      [0xf]: pixelUpdates.some(({ collision }) => collision) ? 0x1 : 0x0
    }),
    programCounter: programCounter + 0x2
  }
}
