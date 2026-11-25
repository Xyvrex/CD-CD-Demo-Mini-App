# CI/CD demo

A small checkout page (`app/index.html`), four Playwright tests (`tests/checkout.spec.js`),
and a GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that tests every push and
deploys the page to GitHub Pages when the tests pass.

## Run it locally (VS Code terminal)

    npm install
    npx playwright install chromium
    npm test

## Run it on GitHub

1. Create a new **public** repository on GitHub.
2. In the repo: Settings > Pages > Source: choose **GitHub Actions**.
3. Push this project to the `main` branch.
4. Open the **Actions** tab and watch the pipeline run. Your live URL appears on the deploy job.

## Demo script

1. Push as-is: tests pass, the page is deployed.
2. In `app/index.html`, change `1 + TAX_RATE` to `1 - TAX_RATE`. Commit and push.
   The test job fails, the deploy job is skipped, and the live site keeps the old version.
3. Change it back, commit and push. Tests pass and the fix goes live.
