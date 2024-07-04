import { BODY, GET, DELETE } from "../index";
import { WindowsEventCondition } from "../types/management";

export function createManagementClient(GET: GET, BODY: BODY, DELETE: DELETE) {
  return {
    listWindowsEventConditions(policyId: number) {
      return GET<WindowsEventCondition>(`/v2/policies/${policyId}/condition/windows-event`);
    },
    createWindowsEventCondition(policyId: number, data: Omit<WindowsEventCondition, "inheritance" | "id" | "conditionName" | "displayName">) {
      return BODY<WindowsEventCondition>(`/v2/policies/${policyId}/condition/windows-event`, data);
    },
    deletePolicyCondition(policyId: number, conditionId: number) {
      return DELETE(`/v2/policies/${policyId}/condition/${conditionId}`);
    }
  } as const;
}