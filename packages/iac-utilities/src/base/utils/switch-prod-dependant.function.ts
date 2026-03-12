import { ProdSwitchable } from '../commons/prod-switchable.model.js'

export function switchProdDependant<K>(
  switchable: ProdSwitchable<K>,
  runtimeConfig: { common: { productionFlag: boolean } },
): K {
  if (runtimeConfig.common.productionFlag) {
    return switchable.prod
  }
  return switchable.nonProd
}
