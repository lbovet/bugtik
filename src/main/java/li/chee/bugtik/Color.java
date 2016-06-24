package li.chee.bugtik;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class Color {
    @Id
    String name;
    String code;

    protected Color() {
    }

    public Color(String name) {
        this.name = name;
    }

    public Color(String name, String code) {
        this.name = name;
        this.code = code;
    }
}
