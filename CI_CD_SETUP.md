# CI/CD Pipeline Setup Guide

This document outlines the comprehensive CI/CD pipeline we've implemented for the Solvd AI Solutions website.

## 🚀 Overview

Our CI/CD pipeline includes:

- **Automated Testing**: Unit tests, integration tests, and coverage reporting
- **Code Quality**: Linting, type checking, and formatting validation
- **Performance Monitoring**: Lighthouse audits and bundle analysis
- **Security**: Automated security audits and vulnerability scanning
- **Deployment**: Automated staging and production deployments
- **Monitoring**: Performance metrics and alerting

## 📋 Prerequisites

### Required Secrets

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

```bash
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here
```

### Required Dependencies

All dependencies are automatically installed via `npm ci` in the workflows.

## 🔧 Workflows

### 1. Main CI Pipeline (`ci.yml`)

**Triggers**: Push to `main`/`develop`, Pull Requests
**Jobs**:

- **Lint & Type Check**: ESLint, TypeScript, Prettier
- **Test Suite**: Jest tests with coverage reporting
- **Build & Performance**: Next.js build and bundle analysis
- **Security Audit**: npm audit for vulnerabilities
- **Deploy Staging**: Auto-deploy to staging on `develop` branch
- **Deploy Production**: Auto-deploy to production on `main` branch

### 2. Performance Monitoring (`performance.yml`)

**Triggers**: Daily at 2 AM UTC, manual dispatch, pushes to `main`
**Jobs**:

- **Lighthouse Audit**: Performance, accessibility, SEO scoring
- **Bundle Analysis**: Webpack bundle size analysis
- **Performance Alerts**: Summary and alerting

## 🧪 Testing

### Running Tests Locally

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI
npm run test:ci
```

### Test Coverage Requirements

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### Adding New Tests

1. Create test files with `.test.tsx` or `.spec.tsx` extension
2. Place tests in the same directory as the component
3. Follow the existing test patterns in `FeaturesGrid.test.tsx`

## 📊 Performance Monitoring

### Core Web Vitals Thresholds

- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 4s
- **Cumulative Layout Shift**: < 0.1
- **Total Blocking Time**: < 500ms
- **Speed Index**: < 3s

### Performance Scores

- **Performance**: ≥ 80%
- **Accessibility**: ≥ 90%
- **Best Practices**: ≥ 80%
- **SEO**: ≥ 80%

## 🚀 Deployment

### Staging Environment

- **Branch**: `develop`
- **Auto-deploy**: Yes
- **URL**: Staging Vercel URL

### Production Environment

- **Branch**: `main`
- **Auto-deploy**: Yes (after all checks pass)
- **URL**: `https://solvdaisolutions.com`

### Deployment Process

1. **Code Push**: Developer pushes to `develop` or `main`
2. **Automated Checks**: CI pipeline runs all tests and checks
3. **Build**: Application builds successfully
4. **Deploy**: Automatic deployment to respective environment
5. **Verification**: Health checks and performance monitoring

## 🔍 Monitoring & Alerts

### Performance Metrics Tracked

- **FCP** (First Contentful Paint)
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **TTFB** (Time to First Byte)

### Alerting

- **Daily Reports**: Automated performance reports
- **Threshold Alerts**: Alerts when performance drops below thresholds
- **Build Failures**: Immediate notifications for failed builds
- **Security Issues**: Alerts for security vulnerabilities

## 🛠️ Local Development

### Pre-commit Hooks

```bash
# Install husky hooks
npm run prepare

# Run pre-commit checks
npm run pre-commit
```

### Quality Checks

```bash
# Lint code
npm run lint

# Check types
npm run type-check

# Format code
npm run format

# Auto-fix issues
npm run auto-fix
```

## 📈 Bundle Analysis

### Analyzing Bundle Size

```bash
# Analyze bundle
npm run analyze

# Server-side analysis
npm run analyze:server

# Browser-side analysis
npm run analyze:browser
```

### Bundle Optimization

- **Tree Shaking**: Automatic removal of unused code
- **Code Splitting**: Automatic chunk splitting
- **Lazy Loading**: Dynamic imports for heavy components
- **Image Optimization**: Next.js Image component with WebP/AVIF

## 🔒 Security

### Security Measures

- **Dependency Scanning**: Automated npm audit
- **Vulnerability Thresholds**: Moderate and high severity checks
- **Security Headers**: XSS protection, content type options
- **Regular Audits**: Daily security checks

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**: Check TypeScript errors and linting issues
2. **Test Failures**: Ensure all tests pass locally before pushing
3. **Performance Issues**: Check Lighthouse scores and bundle sizes
4. **Deployment Failures**: Verify Vercel configuration and secrets

### Getting Help

- Check GitHub Actions logs for detailed error information
- Review performance reports in the Actions artifacts
- Consult the test coverage reports for failing tests

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Jest Testing Framework](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [GitHub Actions](https://docs.github.com/en/actions)

## 🤝 Contributing

When contributing to this project:

1. **Create Feature Branch**: `git checkout -b feature/your-feature`
2. **Write Tests**: Ensure new features have corresponding tests
3. **Run Checks Locally**: `npm run pre-commit`
4. **Push & Create PR**: CI will automatically run all checks
5. **Review & Merge**: After all checks pass and code review

---

**Note**: This pipeline is designed to catch issues early and maintain high code quality. All checks must pass before deployment to production.
