import { createRuleTester } from '../../test/rule-tester.js'
import { NoSpreadArrayMathMessageIds, noSpreadArrayMathRule } from './no-spread-array-math.js'

const ruleTester = createRuleTester()

ruleTester.run('no-spread-array-math', noSpreadArrayMathRule, {
  valid: [
    // spreading a literal array is fine
    { code: `Math.min(...[1, 2, 3])` },
    { code: `Math.max(...[1, 2, 3])` },
    // regular calls without spread are fine
    { code: `Math.min(1, 2, 3)` },
    { code: `Math.max(a, b, c)` },
    // other Math methods are not checked
    { code: `Math.abs(...someData)` },
    // non-Math objects are fine
    { code: `Foo.min(...someData)` },
  ],
  invalid: [
    {
      code: `Math.min(...someData)`,
      errors: [
        {
          messageId: NoSpreadArrayMathMessageIds.NO_SPREAD_ARRAY,
          data: { method: 'min' },
        },
      ],
    },
    {
      code: `Math.max(...someData)`,
      errors: [
        {
          messageId: NoSpreadArrayMathMessageIds.NO_SPREAD_ARRAY,
          data: { method: 'max' },
        },
      ],
    },
    {
      code: `Math.min(...getValues())`,
      errors: [
        {
          messageId: NoSpreadArrayMathMessageIds.NO_SPREAD_ARRAY,
          data: { method: 'min' },
        },
      ],
    },
    {
      code: `Math.min(a, ...rest)`,
      errors: [
        {
          messageId: NoSpreadArrayMathMessageIds.NO_SPREAD_ARRAY,
          data: { method: 'min' },
        },
      ],
    },
    {
      code: `Math.min(...rest, a)`,
      errors: [
        {
          messageId: NoSpreadArrayMathMessageIds.NO_SPREAD_ARRAY,
          data: { method: 'min' },
        },
      ],
    },
    {
      code: `Math.max(...a, ...b)`,
      errors: [
        {
          messageId: NoSpreadArrayMathMessageIds.NO_SPREAD_ARRAY,
          data: { method: 'max' },
        },
        {
          messageId: NoSpreadArrayMathMessageIds.NO_SPREAD_ARRAY,
          data: { method: 'max' },
        },
      ],
    },
  ],
})
