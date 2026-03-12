import { ProdSwitchable, ProdSwitchableKey } from '../commons/prod-switchable.model.js'
import { StageSwitchable, StageSwitchableKey } from '../commons/stage-switchable.model.js'
import { IacStackConfigService } from './iac-stack-config.service.js'
import { AllowedNames } from './type-utils.js'

/** the IacUtils Interface */
export interface IacUtils<P> {
  readonly props: P
  readonly configService: IacStackConfigService

  getProdDependantProp<K extends AllowedNames<P, ProdSwitchable<any>>>(propKey: K): ProdSwitchableKey<P>[K]

  getStageDependantProp<K extends AllowedNames<P, StageSwitchable<any>>>(propKey: K): StageSwitchableKey<P>[K]
}

/** the IacUtils constructable type used as return type when calling the {@link extendWithIacUtils} function */
export type IacUtilsConstructable<P, T extends new (...args: any[]) => any> = new (
  superArgs: ConstructorParameters<T>,
  params: P,
  configService: IacStackConfigService,
) => InstanceType<T> & IacUtils<P>

/** the actual Utilities function which takes any class to extend */
export function extendWithIacUtils<P, T extends new (...args: any[]) => any>(clazz: T): IacUtilsConstructable<P, T> {
  // The Utilities class which implements the Utilities interface */
  class IacUtilsClazz extends (<any>clazz) implements IacUtils<P> {
    constructor(
      superArgs: ConstructorParameters<T>,
      readonly props: P,
      readonly configService: IacStackConfigService,
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      super(...superArgs)
    }

    /**
     * get prod or nonProd value of a prodSwitchable property
     */
    getProdDependantProp<K extends AllowedNames<P, ProdSwitchable<any>>>(propKey: K): ProdSwitchableKey<P>[K] {
      return this.configService.switchProdDependant(<ProdSwitchable<K>>this.props[propKey])
    }

    /**
     * get stage dependant value of a StageSwitchable property
     */
    getStageDependantProp<K extends AllowedNames<P, StageSwitchable<any>>>(propKey: K): StageSwitchableKey<P>[K] {
      return this.configService.switchStageDependant(<StageSwitchable<K>>this.props[propKey])
    }
  }

  return IacUtilsClazz as IacUtilsConstructable<P, T>
}
