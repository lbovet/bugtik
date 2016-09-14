package li.chee.bugtik;

import java.util.List;

import javax.persistence.*;

import lombok.Data;
import lombok.ToString;

@Data
@Entity
public class Project {
    @Id
    @GeneratedValue
    private long id;

    private String name;

    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinTable
    private List<Ticket> tickets;

    protected Project() {
    }

    public Project(String name) {
        this.name = name;
    }
}
