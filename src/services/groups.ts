import { NinjaBase } from "./index";

export class NinjaGroups extends NinjaBase {
  listDevices(groupId: number) {
    return this.GET<number[]>(`/v2/group/${groupId}/device-ids`);
  }
}