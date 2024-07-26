export interface CustomScOverrideEnv {
  /** flag to allow usage of master branch locally */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents,@typescript-eslint/naming-convention
  SC_OVERRIDE: 'true' | any
  /** flag to override branchName for getBranchInfo(), needs to be used in conjunction with SC_OVERRIDE_IS_PR */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents,@typescript-eslint/naming-convention
  SC_OVERRIDE_BRANCH_NAME: string | any
  /** flag to override isPr getBranchInfo(), needs to be used in conjunction with SC_OVERRIDE_BRANCH_NAME */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents,@typescript-eslint/naming-convention
  SC_OVERRIDE_IS_PR: string | any
}
