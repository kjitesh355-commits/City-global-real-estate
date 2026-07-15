# Security Policy

## Critical Security Warning

**IMPORTANT: If any secrets were previously hardcoded in this codebase, they are still present in git history. You MUST rotate any previously hardcoded secrets immediately.**

### Required Actions Before Deployment

1. **Rotate all API keys and secrets** that were ever committed to the repository
2. **Set up environment variables** for all sensitive values
3. **Enable Row Level Security (RLS)** on all Supabase tables if using Supabase
4. **Verify all secrets are in environment variables** - no hardcoded values should exist

### Environment Variables Required

- `GEMINI_API_KEY` - Google Gemini AI API key (server-side only)
- `APP_URL` - Application base URL

### Security Best Practices

- Never commit `.env` files to version control
- Use environment variables for all secrets, API keys, and credentials
- Implement rate limiting on API endpoints
- Sanitize all user inputs before processing
- Return generic error messages to clients (never expose internal details)
- Enable RLS on all database tables
- Regularly rotate API keys and secrets

### What Was Fixed

This codebase has been reviewed and the following security issues were addressed:

1. **Error messages** - No longer expose internal details to clients
2. **Input sanitization** - User inputs are now sanitized before AI processing
3. **Console logging** - Removed logging of sensitive user data
4. **Environment variables** - All secrets properly use environment variables
5. **Gitignore** - Properly configured to exclude `.env` files

### Reporting Security Issues

If you discover a security vulnerability, please report it responsibly by contacting the maintainers directly.