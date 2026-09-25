import type { Lab } from "../types";
import { pyValues, pyDecisions } from "./python-basics";
import { pyLists, pyLoops } from "./python-collections";
import { pyFunctions, pyDicts, pyFiles } from "./python-data";
import { pyProjectMarket } from "./python-project";
import { pyStrings, pyToolkit, pyErrors, pyModules, pyClasses, pyDebugging } from "./python-more";
import { aiMlLabs } from "./ai-ml";
import { scientificLabs } from "./ai-scientific";

export const pythonLabs: Lab[] = [
  pyValues,
  pyDecisions,
  pyLists,
  pyLoops,
  pyStrings,
  pyToolkit,
  pyFunctions,
  pyDicts,
  pyFiles,
  pyErrors,
  pyModules,
  pyClasses,
  pyDebugging,
  pyProjectMarket,
];

export const allLabs: Lab[] = [...pythonLabs, ...scientificLabs, ...aiMlLabs];
