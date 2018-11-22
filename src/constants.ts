export const chip8NumberOfColumns = 64
export const chip8NumberOfRows = 32
export const chip8SpriteWidth = 8

export const chip8KeyMapping = {
  ['1']: 0x1,
  ['2']: 0x2,
  ['3']: 0x3,
  ['4']: 0xc,
  ['q']: 0x4,
  ['w']: 0x5,
  ['e']: 0x6,
  ['r']: 0xd,
  ['a']: 0x7,
  ['s']: 0x8,
  ['d']: 0x9,
  ['f']: 0xe,
  ['z']: 0xa,
  ['x']: 0x0,
  ['c']: 0xb,
  ['v']: 0xf
}

export const chip8Games = ['15PUZZLE', 'BLINKY', 'BRIX', 'MAZE', 'PONG'] as ReadonlyArray<string>

// prettier-ignore
export const chip8Fontset: Uint8Array = 
  Uint8Array.from(
    [ 0xf0, 0x90, 0x90, 0x90, 0xf0, 
      0x20, 0x60, 0x20, 0x20, 0x70, 
      0xf0, 0x10, 0xf0, 0x80, 0xf0, 
      0xf0, 0x10, 0xf0, 0x10, 0xf0,
      0x90, 0x90, 0xf0, 0x10, 0x10,
      0xf0, 0x80, 0xf0, 0x10, 0xf0,
      0xf0, 0x80, 0xf0, 0x90, 0xf0,
      0xf0, 0x10, 0x20, 0x40, 0x40,
      0xf0, 0x90, 0xf0, 0x90, 0xf0,
      0xf0, 0x90, 0xf0, 0x10, 0xf0,
      0xf0, 0x90, 0xf0, 0x90, 0x90,
      0xe0, 0x90, 0xe0, 0x90, 0xe0,
      0xf0, 0x80, 0x80, 0x80, 0xf0,
      0xe0, 0x90, 0x90, 0x90, 0xe0,
      0xf0, 0x80, 0xf0, 0x80, 0xf0,
      0xf0, 0x80, 0xf0, 0x80, 0x80 ])
