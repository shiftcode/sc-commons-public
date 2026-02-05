export enum IacStackNameStrategy {
  /** @deprecated This should only be used for projects sticking to name master for the default branch, other should use PROD_DEPENDANT_MAIN */
  PROD_DEPENDANT,
  STAGE_DEPENDANT,
  PROD_DEPENDANT_MAIN,
}
