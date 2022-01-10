import { words } from './words'

// tslint:disable:one-variable-per-declaration
const emojiVar = '\ufe0f',
  heart = '\u2764' + emojiVar,
  comboGlyph = '\ud83d\udc68\u200d' + heart + '\u200d\ud83d\udc8B\u200d\ud83d\udc68',
  leafs = '\ud83c\udf42',
  rocket = '\ud83d\ude80'

describe('words', () => {
  test('should split correctly', () => {
    expect(words(`A ${leafs}, ${comboGlyph}, and ${rocket}`)).toEqual(['A', leafs, comboGlyph, 'and', rocket])
    expect(words('Hans Muster-Nicht Muster')).toEqual(['Hans', 'Muster', 'Nicht', 'Muster'])
    expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles'])
  })
})
