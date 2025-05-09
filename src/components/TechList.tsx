import { useEffect, useState } from "react";
import type { Tech } from "../models/tech.model";
import { techService } from "../services/tech.service";

const TechList = () => {
  const [techs, setTechs] = useState<Tech[]>([]);

  useEffect(() => {
    techService.getTechs().then(setTechs).catch(err => {
      console.error("Failed to load techs:", err);
    });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Available Technologies</h2>
      <ul>
        {techs.map(tech => (
          <li key={tech.id}>{tech.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TechList;
