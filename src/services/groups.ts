import { GET } from "../index";

export function createGroupsClient(GET: GET) {
  return {
    listDevices(groupId: number) {
      return GET<number[]>(`/v2/group/${groupId}/device-ids`);
    }
  } as const;
}