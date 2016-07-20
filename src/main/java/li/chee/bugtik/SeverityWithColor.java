package li.chee.bugtik;

import org.springframework.data.rest.core.config.Projection;

@Projection(name="withColor", types={ Severity.class })
public interface SeverityWithColor {
    public String getName();
    public Color getColor();
}
