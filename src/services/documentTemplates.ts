import { BODY, DELETE, GET } from "../index";
import { DocumentTemplate } from "../types/documentTemplates";

export function createDocumentTemplatesClient(GET: GET, BODY: BODY, DELETE: DELETE) {
  return {
    list(params?: { includeTechnicianRoles?: boolean, templateName?: string }) {
      return GET<DocumentTemplate[]>("/v2/document-templates", params);
    },
    create(data: Omit<DocumentTemplate, "createTime" | "updateTime" | "id">) {
      return BODY<DocumentTemplate>("/v2/document-templates", data);
    },
    get(id: number, includeTechnicianRoles?: boolean) {
      return GET<DocumentTemplate>(`/v2/document-templates/${id}`, { includeTechnicianRoles });
    },
    update(id: number, data: Omit<DocumentTemplate<false>, "id">) {
      return BODY<DocumentTemplate>(`/v2/document-templates/${id}`, data, "PUT");
    },
    delete(id: number) {
      return DELETE(`/v2/document-templates/${id}`);
    }
  } as const;
}