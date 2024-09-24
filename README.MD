# Portfolio Display

This project is a React-based web application that dynamically displays GitHub repositories with auto-generated summaries based on the README files. The application fetches repository data from an S3 bucket and showcases the repositories in a card format.

## Features

- **Automatic Updates:** The repository information, including summaries, is automatically fetched and displayed, minimizing manual maintenance.
- **Data Scraping and Summarization:** The data is provided by a web scraper that passes the README through ChatGPT to generate a short summary.
- **Responsive Design:** The layout is responsive and adapts to different screen sizes.

## Components

### 1. **App Component**
   - The main entry point of the application.
   - Fetches repository data from an S3 bucket.
   - Displays a loading indicator until data is fetched.
   - Renders a list of `Card` components, each representing a repository.

### 2. **Card Component**
   - Displays individual repository information.
   - Includes the repository name, a brief summary, and a preview image.
   - Links to the GitHub repository.

### 3. **SocialPreview Component**
   - Displays a clickable image linking to the repository.
   - Enhances visual appeal and provides a quick preview of the repository.

## Services

### `getReposFromS3`
- Fetches repository data stored in JSON format from an S3 bucket.
- The data includes repository names, URLs, preview URLs, and auto-generated summaries.