# Coach Dashboard

This directory contains all coach-specific pages and components.

## Structure

```
coach/
├── dashboard/           # Main dashboard components
│   ├── index.tsx       # Dashboard overview
│   ├── analytics.tsx   # Performance analytics
│   └── calendar.tsx    # Schedule management
├── packages/           # Package management
│   ├── index.tsx      # Package list
│   ├── create.tsx     # Create new package
│   ├── edit.tsx       # Edit package
│   └── show.tsx       # Package details
├── clients/           # Client management
│   ├── index.tsx     # Client list
│   ├── show.tsx      # Client details
│   └── progress.tsx  # Client progress tracking
├── sessions/         # Session management
│   ├── index.tsx    # Session list
│   ├── create.tsx   # Create session
│   └── show.tsx     # Session details
└── profile/         # Coach profile
    ├── index.tsx   # Profile overview
    └── edit.tsx    # Profile editing
```

## Features

- Create and manage coaching packages
- Track client progress and goals
- Schedule and manage coaching sessions
- View analytics and performance metrics
- Manage profile and availability
- Handle client communications

## Package Management

The package management section allows coaches to:
- Create new coaching packages
- Edit existing packages
- View package details and analytics
- Manage package content and modules
- Set pricing and availability
- Track package performance 