# Admin Dashboard

This directory contains all admin-specific pages and components.

## Structure

```
admin/
├── dashboard/           # Main dashboard components
│   ├── index.tsx       # Dashboard overview
│   ├── analytics.tsx   # Platform analytics
│   └── reports.tsx     # System reports
├── users/             # User management
│   ├── index.tsx     # User list
│   ├── create.tsx    # Create user
│   ├── edit.tsx      # Edit user
│   └── show.tsx      # User details
├── coaches/          # Coach management
│   ├── index.tsx    # Coach list
│   ├── verify.tsx   # Coach verification
│   └── show.tsx     # Coach details
├── packages/        # Package oversight
│   ├── index.tsx   # All packages
│   └── show.tsx    # Package details
├── settings/       # Platform settings
│   ├── general.tsx # General settings
│   ├── roles.tsx   # Role management
│   └── billing.tsx # Billing settings
└── reports/       # System reports
    ├── users.tsx  # User reports
    ├── sales.tsx  # Sales reports
    └── usage.tsx  # Usage reports
```

## Features

- User and role management
- Coach verification and oversight
- Platform analytics and reporting
- System settings and configuration
- Content moderation
- Billing and payment management
- Platform-wide announcements 