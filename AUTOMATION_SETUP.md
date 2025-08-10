# 🚀 Solvd AI Solutions - Automation Setup Guide

This project is configured with comprehensive automation for a streamlined development experience.

## 🎯 What's Automated

### 1. **Code Formatting & Quality**

- **Auto-save** in VS Code (every 1 second)
- **Auto-format** on save with Prettier
- **Auto-lint** with ESLint
- **Auto-type-check** with TypeScript
- **Auto-import** organization

### 2. **Git Workflow**

- **Pre-commit hooks** that automatically format and check code
- **Auto-staging** of formatted files
- **Branch protection** with automated checks

### 3. **Deployment Pipeline**

- **GitHub Actions** for automatic testing and deployment
- **Vercel integration** with auto-deploy on push
- **Environment-specific** deployments (staging/production)

### 4. **Development Workflow**

- **Live linting** during development
- **Hot reloading** with automatic error checking
- **Concurrent processes** for development and quality checks

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Git repository initialized
- VS Code (recommended) or compatible editor

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Automation Setup

```bash
chmod +x scripts/setup-automation.sh
./scripts/setup-automation.sh
```

### 3. Configure Environment Variables

Create `.env.local` with your API keys:

```bash
# Copy from .env.example and fill in your values
cp .env.example .env.local
```

### 4. Setup GitHub Secrets (for auto-deployment)

Go to your GitHub repository → Settings → Secrets and add:

- `VERCEL_TOKEN` - Your Vercel API token
- `ORG_ID` - Your Vercel organization ID
- `PROJECT_ID` - Your Vercel project ID

## 📋 Available Commands

### Development

```bash
npm run dev              # Start development server
npm run dev:watch        # Development with live linting
npm run build            # Build for production
npm run start            # Start production server
```

### Code Quality

```bash
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run auto-fix         # Format and fix all issues
npm run type-check       # Run TypeScript checks
npm run pre-commit       # Run all quality checks
```

### Deployment

```bash
npm run deploy:staging     # Deploy to staging
npm run deploy:production  # Deploy to production
```

## 🔄 How It Works

### Auto-Save & Format

1. VS Code automatically saves your files every 1 second
2. On save, Prettier formats your code
3. ESLint checks for issues and auto-fixes what it can
4. TypeScript validates types

### Git Hooks

1. When you commit, Husky runs pre-commit hooks
2. Code is automatically formatted
3. Linting and type checking run
4. If all checks pass, files are auto-staged
5. Commit proceeds automatically

### Auto-Deployment

1. Push to `main` branch triggers GitHub Actions
2. Code is automatically tested and built
3. If successful, automatically deploys to Vercel
4. Preview deployments for other branches

## 🎨 VS Code Extensions (Recommended)

Install these extensions for the best experience:

- **Prettier** - Code formatter
- **ESLint** - JavaScript linting
- **Tailwind CSS IntelliSense** - CSS class suggestions
- **GitLens** - Git integration
- **Auto Rename Tag** - HTML/JSX tag management

## 🔧 Customization

### Prettier Rules

Edit `.prettierrc` to customize formatting:

- Line length, quotes, semicolons, etc.

### ESLint Rules

Edit `eslint.config.mjs` to customize linting:

- Add/remove rules, change severity levels

### Git Hooks

Edit `.husky/pre-commit` to customize pre-commit behavior:

- Add tests, security scans, etc.

### GitHub Actions

Edit `.github/workflows/auto-deploy.yml` to customize deployment:

- Add testing, security checks, notifications

## 🚨 Troubleshooting

### Hooks Not Working

```bash
npx husky install
chmod +x .husky/pre-commit
```

### Formatting Issues

```bash
npm run format
npm run auto-fix
```

### Deployment Failures

1. Check GitHub Actions logs
2. Verify environment variables
3. Check Vercel project settings

### VS Code Issues

1. Reload VS Code window
2. Check workspace settings
3. Verify extensions are installed

## 📚 Additional Resources

- [Husky Documentation](https://typicode.github.io/husky/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Vercel CLI](https://vercel.com/docs/cli)

## 🎉 You're All Set!

Your development environment is now fully automated:

- ✅ Code formats automatically
- ✅ Quality checks run on commit
- ✅ Deployments happen automatically
- ✅ Development workflow is streamlined

Focus on building amazing AI solutions while the automation handles the rest! 🚀
