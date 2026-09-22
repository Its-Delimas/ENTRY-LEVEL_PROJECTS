export interface ChecklistStep {
  id: string;
  label: string;
  marker: string;
}

export interface ErrorHint {
  /** Regex source string (case-insensitive), matched against the error message. */
  pattern: string;
  hint: string;
}

export interface ReviewCheck {
  id: string;
  label: string;
  /** Python global variable name to read after a successful practice run. */
  variable: string;
  op: ">=" | ">" | "<=" | "<";
  value: number;
  passDetail: string;
  failDetail: string;
}

export interface Lesson {
  slug: string;
  missionNumber: string;
  title: string;
  subject: string;
  intro: string;
  teach: {
    heading: string;
    paragraphs: string[];
    terms: { term: string; definition: string }[];
  };
  example: {
    heading: string;
    body: string;
    code: string;
  };
  practice: {
    starterCode: string;
    checklist: ChecklistStep[];
  };
  reviewChecks: ReviewCheck[];
  conceptHints: string[];
  errorHints: ErrorHint[];
}

export const rainfallYieldLesson: Lesson = {
  slug: "rainfall-yield",
  missionNumber: "01",
  title: "Rainfall & Crop Yield",
  subject: "Linear Regression",
  intro:
    "Predict maize yield from rainfall, using real-shaped data from smallholder farms in Nakuru County.",

  teach: {
    heading: "What does 'training a model' actually mean?",
    paragraphs: [
      "A machine learning model is just a formula that maps inputs to outputs. For predicting crop yield from rainfall, the simplest useful formula is a straight line: yield = slope × rainfall + intercept.",
      "Training means finding the slope and intercept that fit your data best — the line that stays closest to every point, on average. There's no mystery step where the computer 'learns' on its own; it's arithmetic applied to numbers you already have.",
      "Once you have a slope and intercept, you can predict the yield for rainfall you haven't seen yet — and check how good that prediction is against real outcomes you held back for testing.",
    ],
    terms: [
      {
        term: "Training data",
        definition: "The farms you learn the pattern from.",
      },
      {
        term: "Test data",
        definition: "Farms you hold back, to check the model honestly.",
      },
      {
        term: "Slope & intercept",
        definition: "The two numbers that define your line.",
      },
      {
        term: "Mean Absolute Error",
        definition: "How far off your predictions are, on average.",
      },
    ],
  },

  example: {
    heading: "Watch it work on five farms near Eldoret",
    body: "This is fully worked — read it line by line, then run it. You'll implement the same idea yourself on a different set of farms next.",
    code: `# A tiny worked example: 5 farms near Eldoret
rainfall = [100, 150, 200, 250, 300]
yield_bags = [6, 9, 12, 15, 18]

def mean(values):
    return sum(values) / len(values)

x_mean = mean(rainfall)
y_mean = mean(yield_bags)

# slope: how much yield changes per mm of rainfall
numerator = sum((rainfall[i] - x_mean) * (yield_bags[i] - y_mean) for i in range(len(rainfall)))
denominator = sum((rainfall[i] - x_mean) ** 2 for i in range(len(rainfall)))
slope = numerator / denominator

# intercept: where the line crosses zero rainfall
intercept = y_mean - slope * x_mean

print(f"slope = {slope:.3f}")
print(f"intercept = {intercept:.3f}")

# try it: predict yield for a farm with 275mm of rainfall
predicted = slope * 275 + intercept
print(f"predicted yield at 275mm: {predicted:.1f} bags/acre")
`,
  },

  practice: {
    starterCode: `# Rainfall (mm) and maize yield (bags per acre)
# from 10 smallholder farms in Nakuru County — a different set of
# farms than the example. Same idea; your turn to implement it.
rainfall = [120, 145, 160, 180, 200, 220, 250, 270, 300, 320]
yield_bags = [8, 10, 11, 13, 15, 16, 18, 19, 21, 23]

print(f"Loaded {len(rainfall)} farms")

# TODO 1: Split into train/test sets.
# Use the first 8 farms to train, the last 2 to hold back for testing.
X_train, X_test = None, None   # replace None
y_train, y_test = None, None   # replace None

print(f"Training on {len(X_train)} farms, testing on {len(X_test)} farms")

# TODO 2: Write a function that fits a straight line to (x, y) data
# and returns (slope, intercept), the same way the example did:
#   slope = sum((x-x_mean)*(y-y_mean)) / sum((x-x_mean)**2)
#   intercept = y_mean - slope * x_mean
def fit_line(x, y):
    pass  # replace this

slope, intercept = fit_line(X_train, y_train)
print(f"Model trained: yield = {slope:.4f} * rainfall + {intercept:.4f}")

# TODO 3: Use the model to predict yield for each farm in X_test,
# then compute the Mean Absolute Error between predictions and y_test.
predictions = []   # replace: [slope * x + intercept for x in X_test]
mae = None         # replace: average absolute difference from y_test

print(f"Predictions: {predictions}")
print(f"Actual:      {y_test}")
print(f"Mean Absolute Error: {mae:.2f} bags/acre")

avg_yield = sum(yield_bags) / len(yield_bags)
accuracy = max(0, 100 - (mae / avg_yield * 100))
print(f"Model accuracy: {accuracy:.1f}%")
`,
    checklist: [
      { id: "load", label: "Data loading", marker: "Loaded" },
      { id: "split", label: "Splitting train/test", marker: "Training on" },
      { id: "train", label: "Training model", marker: "Model trained" },
      { id: "evaluate", label: "Evaluating model", marker: "Model accuracy" },
    ],
  },

  reviewChecks: [
    {
      id: "accuracy",
      label: "Model accuracy is at least 70%",
      variable: "accuracy",
      op: ">=",
      value: 70,
      passDetail: "Your model clears the accuracy bar for this mission.",
      failDetail:
        "Your model's accuracy is below 70%. Compare your fit_line against the worked example — the formula for slope and intercept should match exactly.",
    },
    {
      id: "positive-slope",
      label: "Slope reflects more rain → more yield",
      variable: "slope",
      op: ">",
      value: 0,
      passDetail:
        "Your model correctly learned that more rainfall predicts higher yield.",
      failDetail:
        "A zero or negative slope means something is off in fit_line — a positive relationship between rainfall and yield is expected here.",
    },
  ],

  conceptHints: [
    "Start with TODO 1. `X_train, X_test = rainfall[:8], rainfall[8:]` splits a list into the first 8 and the rest — do the same for the labels.",
    "For TODO 2, `fit_line` should do exactly what the example did: compute the means, then slope = numerator / denominator, then intercept.",
    "For TODO 3, predictions is a list comprehension: `[slope * x + intercept for x in X_test]`. MAE is the average of `abs(prediction - actual)`.",
    "Stuck on the formula itself? Re-open the Example stage — the same five lines apply here, just with different variable names.",
  ],

  errorHints: [
    {
      pattern: "cannot unpack non-iterable NoneType",
      hint: "Something is still `None` where a real value is expected — check whether you've replaced every TODO placeholder yet.",
    },
    {
      pattern: "could not convert string to float|unsupported operand type.*str",
      hint: "Your model isn't learning because your data contains text instead of numbers. What transformation could convert these values into something the model can use?",
    },
    {
      pattern: "ZeroDivisionError",
      hint: "You're dividing by zero somewhere. Look at `denominator` inside `fit_line` — what would make that zero?",
    },
    {
      pattern: "object of type 'NoneType' has no len|TypeError.*NoneType",
      hint: "You're calling a function on something that's still `None`. Check TODO 1 — have you actually replaced both `None` placeholders?",
    },
    {
      pattern: "IndexError",
      hint: "You're reaching for a list index that doesn't exist. Check the length of the list against the index you're using.",
    },
    {
      pattern: "NameError",
      hint: "Python doesn't recognize a name you used. Check for a typo, or a variable used before it was defined.",
    },
    {
      pattern: "SyntaxError",
      hint: "There's a syntax issue — check for a missing colon, parenthesis, or indentation.",
    },
  ],
};
