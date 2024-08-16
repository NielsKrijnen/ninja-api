import { NinjaBase } from "../index";
import { DocumentTemplate } from "./types";

export class NinjaDocumentTemplates extends NinjaBase {
  list(params?: { includeTechnicianRoles?: boolean, templateName?: string }) {
    return this.GET<DocumentTemplate[]>("/v2/document-templates", params);
  }
  create(data: Omit<DocumentTemplate, "createTime" | "updateTime" | "id">) {
    return this.BODY<DocumentTemplate>("/v2/document-templates", data);
  }
  get(id: number, includeTechnicianRoles?: boolean) {
    return this.GET<DocumentTemplate>(`/v2/document-templates/${id}`, { includeTechnicianRoles });
  }
  update(id: number, data: Omit<DocumentTemplate<false>, "id">) {
    return this.BODY<DocumentTemplate>(`/v2/document-templates/${id}`, data, "PUT");
  }
  delete(id: number) {
    return this.DELETE(`/v2/document-templates/${id}`);
  }
}