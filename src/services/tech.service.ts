import type { Tech } from "../models/tech.model";
import { httpService } from "./http.service";

const getTechs = async (): Promise<Tech[]> => {
  const techs = await httpService.get<Tech[]>("techs");
  return techs;
};

export const techService = {
  getTechs,
};
