#!/bin/bash

echo "🚀 Setting up Solvd AI Solutions automation environment..."

# Install development dependencies
echo "📦 Installing development dependencies..."
npm install --save-dev prettier husky lint-staged concurrently

# Install Husky for Git hooks
echo "🔧 Setting up Husky Git hooks..."
npx husky install

# Make pre-commit hook executable
chmod +x .husky/pre-commit

# Create .prettierignore
echo "📝 Creating .prettierignore..."
cat > .prettierignore << EOL
.next/
node_modules/
*.log
.env*
.vercel/
EOL

# Create .eslintignore
echo "🔍 Creating .eslintignore..."
cat > .eslintignore << EOL
.next/
node_modules/
*.log
.env*
.vercel/
public/
EOL

# Initialize Git hooks
echo "🎣 Initializing Git hooks..."
npx husky add .husky/pre-commit "npm run pre-commit"

echo "✅ Automation setup complete!"
echo ""
echo "📋 Available commands:"
echo "  npm run format          - Format all code"
echo "  npm run auto-fix        - Format and fix linting issues"
echo "  npm run dev:watch       - Development with live linting"
echo "  npm run deploy:staging  - Deploy to staging"
echo "  npm run deploy:production - Deploy to production"
echo ""
echo "🔗 Git hooks are now active - code will be automatically formatted on commit"
echo "🌐 GitHub Actions will auto-deploy on push to main branch"
echo "💾 VS Code will auto-save and format on save"
