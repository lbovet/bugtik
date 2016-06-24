package li.chee.bugtik;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Data
@Entity
public class Ticket {
	@Id
	@GeneratedValue
	private long id;

	private String summary;

	private String owner;

	@ManyToOne
	private Severity severity;

	protected Ticket() {
	}

	public Ticket(String summary, Severity severity) {
		this.summary = summary;
		this.severity = severity;
	}
}
