# Working together

1. Clone this repository and create a branch for your change.
2. Run the website using the command in README.md.
3. Edit the relevant file in `web/` or tool in `tools/`.
4. Check the changed behavior with manual answers and a local case JSON. Check the points scorecard, both question viewers, reset, export and re-import when affected.
5. Run `node tools/check_site.cjs`. Review `git diff` and `git status`. Keep patient files and credentials out of the commit.
6. Open a pull request explaining the behavior change and how you checked it.

Use descriptive function and variable names, short functions, normal indentation, and comments explaining decisions rather than restating the code. Keep data import, scoring, and page rendering separate. Prefer small changes that collaborators can review.

Handwritten browser code uses Prettier 3 formatting. Python tools use Black formatting. Generated model files may retain their generator's formatting. Formatting alone should not alter model weights or predictions.

When editing questions, use their permanent IDs rather than their displayed positions. Displayed numbers change when questions are removed. Do not add or change scoring rules without documenting the clinical instruction and validating scores.
