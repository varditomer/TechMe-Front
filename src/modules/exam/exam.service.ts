import { httpService } from "../../services/http.service";
import type { Tech, Question } from "./exam.models";

const getTechs = async (): Promise<Tech[]> => {
  return httpService.get<Tech[]>("techs");
};

const startExam = async ({
  techs,
  numPerTech,
}: {
  techs: string[];
  numPerTech: number;
}): Promise<Question[]> => {
  return httpService.post<Question[]>("exam/start", { techs, numPerTech });
};

export const examService = {
  getTechs,
  startExam,
};
