import { StageInfo } from '@shiftcode/branch-utilities'
import { describe, expect, test } from 'vitest'

import { IacStackNameStrategy } from '../commons/iac-stack-name-strategy.enum.js'
import { ProdSwitchable } from '../commons/prod-switchable.model.js'
import { StageSwitchable } from '../commons/stage-switchable.model.js'
import { extendWithIacUtils } from './extend-with-iac-utils.function.js'
import { IacStackConfigService } from './iac-stack-config.service.js'

describe('extendWithIacUtils', () => {
  class BaseClass {
    constructor(readonly name: string) {}
  }

  interface TestStackProps {
    a: ProdSwitchable<number>
    b: StageSwitchable<string>
    c: boolean
  }

  class TestStack extends extendWithIacUtils<TestStackProps, typeof BaseClass>(BaseClass) {
    constructor(name: string, props: TestStackProps, configService: IacStackConfigService) {
      super([name], props, configService)
    }
  }

  test('works with correct type inference', () => {
    const rtConfig: StageInfo = {
      stage: 'xx1',
      isPr: false,
      isProd: false,
    }
    const region = 'eu-central-1'
    const props: TestStackProps = {
      a: { prod: 100, nonProd: 50 },
      b: { prod: '1', pr: '2', xx: '3', xx1: '4' },
      c: true,
    }
    const x = new TestStack(
      'test',
      props,
      new IacStackConfigService('iac-test', IacStackNameStrategy.STAGE_DEPENDANT, rtConfig, region),
    )

    expect(x.getProdDependantProp('a')).toEqual(50)
    expect(x.getStageDependantProp('b')).toEqual('4')
    expect(x.props.c).toEqual(true)
    expect(x.configService.stackName).toBe('iac-test-xx1')
  })
})
