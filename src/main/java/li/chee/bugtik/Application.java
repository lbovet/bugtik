package li.chee.bugtik;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.PostConstruct;
import java.util.Arrays;

@SpringBootApplication
@Controller
@Configuration
public class Application extends RepositoryRestConfigurerAdapter {
    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private SeverityRepository severityRepository;
    @Autowired
    private ColorRepository colorRepository;

    @PostConstruct
    public void createInitialData() {
        Color red = new Color("red", "#FFCCAA");
        Color blue = new Color("blue", "#AACCFF");
        Color grey = new Color("grey", "#EEEEEE");
        Color green = new Color("green", "#AAFFCC");
        colorRepository.save(Arrays.asList(red, blue, grey, green));
        Severity critical = new Severity("critical", red);
        Severity normal = new Severity("normal", blue);
        severityRepository.save(Arrays.asList(critical, normal, new Severity("low", grey)));
        Ticket specs = new Ticket("Write specs", normal);
        specs.setOwner("me");
        Ticket bug = new Ticket("Fix build", critical);
        bug.setOwner("john");
        ticketRepository.save(Arrays.asList(specs, bug));
        Project project = new Project("hybind");
        project.setTickets(Arrays.asList(specs, bug));
        projectRepository.save(project);
        projectRepository.save(new Project("bugtik"));
    }

    @RequestMapping("/")
    public String index() {
        return "index.html";
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Ticket.class, Severity.class, Color.class);
    }

}
