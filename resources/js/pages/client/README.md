# Client Dashboard

This directory contains all client-specific pages and components.

## Structure

```
client/
├── dashboard/           # Main dashboard components
│   ├── index.tsx       # Dashboard overview
│   ├── progress.tsx    # Progress tracking
│   └── calendar.tsx    # Calendar/schedule view
├── packages/           # Package-related pages
│   ├── index.tsx      # Available packages list
│   ├── show.tsx       # Package details
│   └── purchase.tsx   # Package purchase flow
├── sessions/          # Coaching session pages
│   ├── index.tsx     # Session list
│   ├── show.tsx      # Session details
│   └── schedule.tsx  # Session scheduling
└── profile/          # Client profile pages
    ├── index.tsx    # Profile overview
    └── edit.tsx     # Profile editing
```

## Features

- View and purchase coaching packages
- Schedule and manage coaching sessions
- Track progress and goals
- Manage profile and preferences
- View calendar and upcoming sessions 