# Contributing to Shah Works

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit your changes: `git commit -m 'Add feature'`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Open a Pull Request

## Development Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and fill in your API credentials
3. Run dev server: `npm run dev`
4. Test your changes

## Code Style

- Use TypeScript for all new files
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

## Testing

Before submitting a PR:

- [ ] Run `npm run build` - should complete without errors
- [ ] Test all affected features manually
- [ ] Check browser console for errors
- [ ] Test API integration (if applicable)
- [ ] Verify responsive design on mobile/tablet

## Security

- **Never commit** `.env.local` or any file with credentials
- **Never commit** API keys, secrets, or passwords
- Review your changes for any sensitive data before committing
- Use environment variables for all configuration

## Commit Messages

Use clear, descriptive commit messages:

- `feat: Add transaction export functionality`
- `fix: Resolve pagination issue in transactions table`
- `docs: Update API integration guide`
- `refactor: Improve error handling in API client`

## Pull Request Process

1. Ensure your branch is up to date with main
2. Write a clear description of your changes
3. Reference any related issues
4. Add screenshots if UI changes are involved
5. Wait for review and address feedback

## Questions?

If you have questions, please open an issue or contact the maintainers.

