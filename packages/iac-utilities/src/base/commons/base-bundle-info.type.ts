export interface BaseBundleInfo {
  handlerName: string
  functionName: string
  baseFilename: string
  outPath: string
}

export interface BundleInfo extends BaseBundleInfo {
  entryPoint: string
  filename: string
}
