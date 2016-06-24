package li.chee.bugtik;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Data
@Entity
public class Severity {
    @Id
    private String name;

    @ManyToOne
    private Color color;

    protected Severity() {
    }

    public Severity(String name, Color color) {
        this.name = name;
        this.color = color;
    }
}
