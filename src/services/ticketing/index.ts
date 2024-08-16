import { NinjaBase } from "../index";
import { Comment, CreateTicket, LogEntry, LogEntryType, Ticket, UpdateTicket } from "./types";

export class NinjaTicketing extends NinjaBase {
  create(data: CreateTicket) {
    return this.BODY<Ticket>("/v2/ticketing/ticket", data);
  }
  comment(ticketId: number, data: Comment) {
    return this.BODY<string>(`/v2/ticketing/ticket/${ticketId}/comment`, data);
  }
  get(ticketId: number) {
    return this.GET<Ticket>(`/v2/ticketing/ticket/${ticketId}`);
  }
  update(ticketId: number, data: UpdateTicket) {
    return this.BODY<Ticket>(`/v2/ticketing/ticket/${ticketId}`, data, "PUT");
  }
  listLogEntries(ticketId: number, params?: {
    anchorId?: number
    createTime?: string
    pageSize?: number
    type?: LogEntryType
  }) {
    return this.GET<LogEntry[]>(`/v2/ticketing/ticket/${ticketId}/log-entry`, params);
  }
}