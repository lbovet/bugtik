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

    @PostConstruct
    public void createInitialData() {
        Severity severity = new Severity("critical", "red");
        severityRepository.save(severity);
        Ticket ticket = new Ticket("Write specs", severity);
        ticketRepository.save(ticket);
        Project project = new Project("hybind");
        project.setTickets(Arrays.asList(ticket));
        projectRepository.save(project);
        projectRepository.save(new Project("bugtick"));
    }

    @RequestMapping("/")
    public String index() {
        return "index.html";
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Severity.class);
    }

}




