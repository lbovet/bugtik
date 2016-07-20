package li.chee.bugtik;

import org.springframework.data.rest.core.config.Projection;

@Projection(name="withSeverity", types={ Ticket.class })
public interface TicketWithSeverity {
    public long getId();
    public String getOwner();
    public String getSummary();
    public SeverityWithColor getSeverity();
}
