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

export interface Lesson {
  slug: string;
  missionNumber: string;
  title: string;
  subject: string;
  intro: string;
  starterCode: string;
  checklist: ChecklistStep[];
  conceptHints: string[];
  errorHints: ErrorHint[];
}

export const rainfallYieldLesson: Lesson = {
  slug: "rainfall-yield",
  missionNumber: "01",
  title: "Rainfall & Crop Yield",
  subject: "Linear Regression",
  intro:
    "Today you'll build your first ML model — predicting maize yield from rainfall, using real-shaped data from smallholder farms in Nakuru County.",
  starterCode: `# Rainfall (mm) and maize yield (bags per acre)
# from smallholder farms in Nakuru County
rainfall = [120, 145, 160, 180, 200, 220, 250, 270, 300, 320]
yield_bags = [8, 10, 11, 13, 15, 16, 18, 19, 21, 23]

# Step 1: Load data
print(f"Loaded {len(rainfall)} farms")

# Step 2: Explore the data
avg_rainfall = sum(rainfall) / len(rainfall)
avg_yield = sum(yield_bags) / len(yield_bags)
print(f"Average rainfall: {avg_rainfall:.1f} mm")
print(f"Average yield: {avg_yield:.1f} bags/acre")

# Step 3: Train a linear regression model (least squares)
# Split into train/test sets: first 8 farms to train, last 2 to test
X_train, X_test = rainfall[:8], rainfall[8:]
y_train, y_test = yield_bags[:8], yield_bags[8:]

def fit_line(x, y):
    n = len(x)
    x_mean = sum(x) / n
    y_mean = sum(y) / n
    numerator = sum((x[i] - x_mean) * (y[i] - y_mean) for i in range(n))
    denominator = sum((x[i] - x_mean) ** 2 for i in range(n))
    slope = numerator / denominator
    intercept = y_mean - slope * x_mean
    return slope, intercept

slope, intercept = fit_line(X_train, y_train)
print(f"Model trained: yield = {slope:.4f} * rainfall + {intercept:.4f}")

# Step 4: Evaluate on the test set
predictions = [slope * x + intercept for x in X_test]
errors = [abs(p - a) for p, a in zip(predictions, y_test)]
mae = sum(errors) / len(errors)

print(f"Predictions: {[round(p, 1) for p in predictions]}")
print(f"Actual:      {y_test}")
print(f"Mean Absolute Error: {mae:.2f} bags/acre")

accuracy = max(0, 100 - (mae / avg_yield * 100))
print(f"Model accuracy: {accuracy:.1f}%")
`,
  checklist: [
    { id: "load", label: "Data loading", marker: "Loaded" },
    { id: "explore", label: "Exploring data", marker: "Average rainfall" },
    { id: "train", label: "Training model", marker: "Model trained" },
    { id: "evaluate", label: "Evaluating model", marker: "Model accuracy" },
  ],
  conceptHints: [
    "Run the starter code first to see the full pipeline end to end — then come back and change something.",
    "`fit_line` finds the slope and intercept that minimize squared error. That's what 'training' means here — no magic, just arithmetic on the numbers you gave it.",
    "Try adding a new farm to `rainfall` and `yield_bags`. How does the model's accuracy change?",
    "What happens to accuracy if you train on only the first 3 farms instead of 8? Why might that be worse?",
    "The model is a straight line: yield = slope * rainfall + intercept. What does a bigger slope mean about the relationship between rainfall and yield?",
  ],
  errorHints: [
    {
      pattern: "could not convert string to float|unsupported operand type.*str",
      hint: "Your model isn't learning because your data contains text instead of numbers. What transformation could convert these values into something the model can use?",
    },
    {
      pattern: "ZeroDivisionError",
      hint: "You're dividing by zero somewhere. Look at `denominator` inside `fit_line` — what would make that zero?",
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
