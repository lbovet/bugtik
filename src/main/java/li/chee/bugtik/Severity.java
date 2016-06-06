package li.chee.bugtik;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class Severity {
    @Id
    private String name;

    private String color;

    protected Severity() {
    }

    public Severity(String name, String color) {
        this.name = name;
        this.color = color;
    }
}
