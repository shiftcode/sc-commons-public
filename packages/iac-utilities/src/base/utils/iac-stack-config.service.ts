import { StageInfo } from '@shiftcode/branch-utilities'

import { IacStackNameStrategy } from '../commons/iac-stack-name-strategy.enum.js'
import { ProdSwitchable } from '../commons/prod-switchable.model.js'
import { StageSwitchable } from '../commons/stage-switchable.model.js'
import { BaseRuntimeConfig } from './base-runtime-config.type.js'

export type BaseRuntimeConfigProviderFn = () => BaseRuntimeConfig

export class IacStackConfigService {
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  static readonly envBaseRuntimeConfig = 'SC_BASE_RUNTIME_CONFIG'

  readonly stackName: string

  constructor(
    readonly stackBaseName: string,
    private readonly nameStrategy: IacStackNameStrategy,
    readonly stageInfo: StageInfo,
    readonly region: string,
  ) {
    this.stackName = this.nameByStrategy(stackBaseName)
  }

  /**
   * concatenates given propertyToName according to defined nameStrategy.
   * default mode is 'append'
   */
  nameByStrategy(propertyToName: string, mode: 'append' | 'prepend' = 'append') {
    switch (this.nameStrategy) {
      case IacStackNameStrategy.PROD_DEPENDANT:
        return this.prodDependantNaming('master', propertyToName, mode)
      case IacStackNameStrategy.PROD_DEPENDANT_MAIN:
        return this.prodDependantNaming('main', propertyToName, mode)
      case IacStackNameStrategy.STAGE_DEPENDANT:
        return this.stageDependantNaming(propertyToName, mode)
      default:
        throw new Error('Unsupported enum value for IacStackNameStrategy')
    }
  }

  /**
   * create name by defined {@link nameByStrategy} and given region
   * mode defaults to append
   * @example
   * nameByStrategyAndRegion('abc') =>
   */
  nameByStrategyAndRegion(propertyToName: string, mode: 'append' | 'prepend' = 'append') {
    switch (this.nameStrategy) {
      case IacStackNameStrategy.PROD_DEPENDANT:
        return this.prodDependantNaming('master', this.regionDependantNaming(propertyToName, mode), mode)
      case IacStackNameStrategy.PROD_DEPENDANT_MAIN:
        return this.prodDependantNaming('main', this.regionDependantNaming(propertyToName, mode), mode)
      case IacStackNameStrategy.STAGE_DEPENDANT:
        return this.stageDependantNaming(this.regionDependantNaming(propertyToName, mode), mode)
      default:
        throw new Error('Unsupported enum value for IacStackNameStrategy')
    }
  }

  /** prepends the {@link stackName} to proveided propertyName */
  stackDependantNaming(propertyToName: string) {
    return `${this.stackName}-${propertyToName}`
  }

  /**
   * get prod or nonProd value of a prodSwitchable property
   */
  switchProdDependant<K>(valueToSwitch: ProdSwitchable<K>): K {
    return this.stageInfo.isProd ? valueToSwitch.prod : valueToSwitch.nonProd
  }

  prodDependant<K>(prodValue: K, nonProd: K) {
    return this.stageInfo.isProd ? prodValue : nonProd
  }

  /**
   * get stage dependant value of a StageSwitchable property
   * (falls back to the xx value if actual stage is not defined in valueToSwitch)
   */
  switchStageDependant<K>(valueToSwitch: StageSwitchable<K>): K {
    const { stage, isProd, isPr } = this.stageInfo
    if (stage in valueToSwitch) {
      return valueToSwitch[stage]
    }
    if (isProd) {
      return valueToSwitch.prod
    }
    if (isPr) {
      return valueToSwitch.pr
    }
    return valueToSwitch.xx
  }

  /**
   * create a stack and region dependant bucket name
   * @return `${stackName}-${region}-${name}`
   */
  createBucketName(name: string): string {
    return `${this.stackName}-${this.region}-${name}`
  }

  /**
   * concatenates given propertyToName with the region.
   * mode defaults to append (= `${propertyToName}-${region}`)
   */
  private regionDependantNaming(propertyToName: string, mode: 'append' | 'prepend' = 'append') {
    return mode === 'append' ? `${propertyToName}-${this.region}` : `${this.region}-${propertyToName}`
  }

  /**
   * concatenates given propertyToName with the stage.
   * mode defaults to append (= `${propertyToName}-${stage}`)
   */
  private stageDependantNaming(propertyToName: string, mode: 'append' | 'prepend' = 'append') {
    return mode === 'append' ? `${propertyToName}-${this.stageInfo.stage}` : `${this.stageInfo.stage}-${propertyToName}`
  }

  /**
   * Since prod currently is represented by either 'master' | 'main' we support both keywords.
   * Concatenates given propertyToName with either 'nonProd' or 'master'|'main' (depending on naming convention).
   * mode defaults to append (= `${propertyToName}-${nonProd|<master|main>}`)
   */
  private prodDependantNaming(
    prodKeyword: 'master' | 'main',
    propertyToName: string,
    mode: 'append' | 'prepend' = 'append',
  ) {
    // we call the prod stack master to be congruent with stack dependant naming
    const toAdd = this.stageInfo.isProd ? prodKeyword : 'nonProd'

    return mode === 'append' ? `${propertyToName}-${toAdd}` : `${toAdd}-${propertyToName}`
  }
}
