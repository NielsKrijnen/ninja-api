import { CustomFieldType, DateFilterType, IPAddressType, Permission, TechnicianPermission } from "../system/types";
import { NodeClass } from "../types";

export type DocumentTemplate<Time extends boolean = true> = {
  id: number
  name: string
  description: string
  allowMultiple: boolean
  mandatory: boolean
  createTime: Time extends true ? number : undefined
  updateTime: Time extends true ? number : undefined
  fields: DocumentTemplateField<Time>[]
  availableToAllTechnicians: boolean
  allowedTechnicianRoles: number[]
}

export type DocumentTemplateField<Time extends boolean = true> = {
  fieldId: number
  fieldLabel: string
  fieldName: string
  fieldDescription: string
  fieldType: CustomFieldType
  fieldTechnicianPermission: TechnicianPermission
  fieldScriptPermission: Permission
  fieldApiPermission: Permission
  fieldDefaultValue: string
  fieldContent: {
    values: {
      id: string
      name: string
      active: boolean
    }[]
    required: boolean
    footerText: string
    tooltipText: string
    advancedSettings: {
      fileMaxSize: number
      fileExtensions: string[]
      dateFilters: {
        type: DateFilterType
        selected: string[]
      }
      maxCharacters: number
      complexityRules: {
        mustContainOneInteger: boolean
        mustContainOneLowercaseLetter: boolean
        mustContainOneUppercaseLetter: boolean
        greaterOrEqualThanSixCharacters: boolean
      }
      numericRange: {
        min: number
        max: number
      }
      org: number[]
      nodeClass: NodeClass
      ipAddressType: IPAddressType
      expandLargeValueOnRender: boolean
    }
  }
  uiElementUid: string
  uiElementName: string
  uiElementType: "TITLE" | "DESCRIPTION" | "SEPARATOR"
  uiElementValue: string
  createdTime: Time extends true ? number : undefined
  updatedTime: Time extends true ? number : undefined
}