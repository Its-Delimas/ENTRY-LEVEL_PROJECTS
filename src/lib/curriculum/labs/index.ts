import type { Lab } from "../types";
import { pyValues, pyDecisions } from "./python-basics";
import { pyLists, pyLoops } from "./python-collections";
import { pyFunctions, pyDicts, pyFiles } from "./python-data";
import { pyProjectMarket } from "./python-project";
import { aiMlLabs } from "./ai-ml";

export const pythonLabs: Lab[] = [
  pyValues,
  pyDecisions,
  pyLists,
  pyLoops,
  pyFunctions,
  pyDicts,
  pyFiles,
  pyProjectMarket,
];

export const allLabs: Lab[] = [...pythonLabs, ...aiMlLabs];
