# Composable Action

A GitHub Action for composable sync and build operations.

## Usage

### Basic Usage

Add this action to your workflow file (`.github/workflows/your-workflow.yml`):

```yaml
name: Composable Action Workflow
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  composable-sync:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Run Composable Action
      uses: vnptcomposableapp-cmyk/composable-action@main
      with:
        run: 'sync'
        github_token: ${{ secrets.GITHUB_TOKEN }}
        project_id: 'your-project-id'
        project_api_token: ${{ secrets.PROJECT_API_TOKEN }}
        platform: 'nextjs'
        language: 'ts'
        scheme: 'codegen'
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `run` | Action to perform ('init', 'sync', 'build') | Yes | - |
| `github_token` | GitHub token for repository operations | No | - |
| `project_id` | Project ID | No | - |
| `project_api_token` | Project API token | No | - |
| `platform` | Framework ('nextjs', 'gatsby', 'react') | No | - |
| `language` | Language ('js', 'ts') | No | - |
| `scheme` | Scheme ('codegen', 'loader') | No | - |
| `branch` | Branch to use | No | - |
| `title` | Commit title | No | - |
| `description` | Commit description | No | - |
| `directory` | Working directory relative to repository root | No | - |
| `sync_action` | Sync action to perform ('commit', 'pr') | No | - |
| `skip_if_plasmic` | Skip build if last commit was automated | No | - |

## Outputs

| Output | Description |
|--------|-------------|
| `synced` | True if project was synced |
| `new_branch` | New branch name (if created) |
| `publish_dir` | Build/dist directory to publish |

## Examples

### Initialize Project

```yaml
- name: Initialize Project
  uses: vnptcomposableapp-cmyk/composable-action@main
  with:
    run: 'init'
    platform: 'nextjs'
    language: 'ts'
    scheme: 'codegen'
```

### Sync Project

```yaml
- name: Sync Project
  uses: vnptcomposableapp-cmyk/composable-action@main
  with:
    run: 'sync'
    project_id: ${{ secrets.PROJECT_ID }}
    project_api_token: ${{ secrets.PROJECT_API_TOKEN }}
    github_token: ${{ secrets.GITHUB_TOKEN }}
    sync_action: 'commit'
    title: 'Auto-sync project'
```

### Build Project

```yaml
- name: Build Project
  uses: vnptcomposableapp-cmyk/composable-action@main
  with:
    run: 'build'
    platform: 'nextjs'
    directory: './frontend'
```

## Development

### Setup

1. Clone the repository
2. Install dependencies: `yarn install`
3. Build: `yarn build`
4. Format code: `yarn format`

### Making Changes

1. Edit TypeScript files in `src/`
2. Build with `yarn build`
3. Commit both source and built files
4. Tag releases for stable versions

## Publishing Your Action

### Method 1: Use from GitHub Repository

Users can reference your action directly:

```yaml
uses: vnptcomposableapp-cmyk/composable-action@main  # Latest
uses: vnptcomposableapp-cmyk/composable-action@v1    # Stable version
```

### Method 2: Publish to GitHub Marketplace

1. Go to your repository on GitHub
2. Click "Releases" → "Create a new release"
3. Tag version (e.g., `v1.0.0`)
4. Check "Publish this Action to the GitHub Marketplace"
5. Fill in marketplace details
6. Publish the release

## Publishing

Make sure you always build with your commits:

    yarn all