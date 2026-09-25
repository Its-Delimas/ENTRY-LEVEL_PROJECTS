/**
 * Plain-language readings of Python errors. The goal is to make the error
 * itself part of the lesson: what Python is telling you, and where to look.
 */
export const errorGuide: Record<string, { title: string; plain: string }> = {
  NameError: {
    title: "Python doesn't know that name",
    plain:
      "You used a name that hasn't been created yet. Usually it's a typo, a missing quote around text, or a variable used before the line that creates it.",
  },
  SyntaxError: {
    title: "Python couldn't read this line",
    plain:
      "The code breaks Python's grammar, so nothing ran at all. Look for a missing colon, bracket, or quote on or just before the marked line.",
  },
  IndentationError: {
    title: "The indentation is off",
    plain:
      "Python uses indentation to know which lines belong to an `if`, `for`, or `def`. Lines in the same block need the same number of spaces.",
  },
  TypeError: {
    title: "Wrong kind of value",
    plain:
      "An operation got a value of the wrong type — like adding text to a number, or calling something that isn't a function. Check what type each value really is.",
  },
  ValueError: {
    title: "Right type, wrong value",
    plain:
      "The value has the right type but can't be used this way — for example `int(\"abc\")`. Look at the actual value being converted or unpacked.",
  },
  IndexError: {
    title: "That position doesn't exist",
    plain:
      "You asked a list for a position past its end. A list of 5 items has positions 0 to 4 — there is no position 5.",
  },
  KeyError: {
    title: "That key isn't in the dictionary",
    plain:
      "You looked up a key that doesn't exist. Keys must match exactly — spelling, capitals, and plural vs singular all count. Check the available keys below.",
  },
  AttributeError: {
    title: "That value doesn't have this ability",
    plain:
      "You used `.something` on a value that doesn't support it — for example calling a list method on a number. Check the type of the value before the dot.",
  },
  ZeroDivisionError: {
    title: "Division by zero",
    plain:
      "Somewhere a number is divided by zero. Find the division and ask: which value could be zero here — an empty list's length, perhaps?",
  },
  FileNotFoundError: {
    title: "File not found",
    plain:
      "Python couldn't find a file with that name. Check the exact filename, including the extension.",
  },
  UnboundLocalError: {
    title: "Variable used before it was set",
    plain:
      "Inside a function, a variable was read before it was given a value. Make sure it's assigned first.",
  },
  TimeoutError: {
    title: "Your code never finished",
    plain:
      "This is almost always an infinite loop — a `while` whose condition never becomes False. Check that something inside the loop moves it toward stopping.",
  },
};

export function explainError(type: string) {
  return (
    errorGuide[type] ?? {
      title: "Python hit a problem",
      plain:
        "Read the last line of the error — it names the problem. The line number tells you where Python was when it stopped.",
    }
  );
}
