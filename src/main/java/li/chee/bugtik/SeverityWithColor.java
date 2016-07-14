package li.chee.bugtik;

import org.springframework.data.rest.core.config.Projection;

/**
 * Created by shaman on 7/3/16.
 */
@Projection(name="withColor", types={ Severity.class })
public interface SeverityWithColor {
    public String getName();
    public Color getColor();
}
