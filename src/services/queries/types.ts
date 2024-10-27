export type AntivirusStatus = {
  productName: string
  productState?: "ON" | "OFF"
  definitionStatus?: "Out-of-Date" | "Up-to-Date"
  version: string
  deviceId: number
  timestamp: number
}

export type AntivirusThreat = {
  /** Threat name **/
  name: string
  /** AntiVirus vendor product code **/
  productCode: string
  /** Threat Quarantine ID **/
  quarantineId: string
  /** Threat Status (vendor specific) **/
  status: string
  /** Type of Threat **/
  type: string
  /** Threat ID **/
  threatId: number
  /** Threat Category **/
  category: string
  /** Threat Level **/
  level: string
  /** Detection source **/
  detectionSource: string
  /** Trace list (Files, Cookies, etc. Vendor specific) **/
  traceList: string
  /** Device identifier **/
  deviceId: number
  /** Date/Time when data was collected/updated **/
  timestamp: number
}