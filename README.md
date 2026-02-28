your-monorepo/
├── apps/
│   ├── zayaslanguage/        # Web app - zayaslanguage.com
│   ├── zayaweb/              # Webpage - zayaweb.com
│   ├── aloud/                 # Extension (static)
│   ├── aesthetic/             # Extension (static)
│   └── transliteration/       # Python backend - api.transliteration.com
│       ├── api/
│       │   ├── __init__.py
│       │   └── endpoints.py   # Your Python functions
│       ├── requirements.txt
│       ├── vercel.json        # Python-specific config
│       └── package.json       # For Turborepo integration
├── packages/
│   └── shared/                 # Auth, payments, utils
├── package.json                # Root with workspaces
└── turbo.json                  # Turborepo config


                    [ZAYA BARRINI]
                          ↓
              [Individual Expert / Thought Leader]
                          ↓
        ┌─────────────────┴─────────────────┐
        ↓                                     ↓
[spacedesign]                           [signflow]
Urban Psychic Cybernetics               Cognitive Language Systems
        ↓                                     ↓
Physical/Digital Space Design           Human Communication Technology
        ↓                                     ↓
Institutions, Governments                Individuals, Organizations


# Zaya Monorepo

## 🏗️ Structure

```
apps/
├── spacedesign/     # Web app - spacedesign.com (formerly zayaweb)
├── signflow/        # Web app - signflow.com (formerly zayaslanguage)
├── aloud/           # Browser extension
├── aesthetic/       # Browser extension
└── transliteration/ # Python backend API

packages/
├── core/            # Core business logic, types, errors
├── country-adapters/# Country-specific payment adapters
├── stripe/          # Stripe payment integration
├── auth/            # Shared authentication logic
├── ui/              # Shared UI components
└── shared/          # Other shared utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- npm 9+

### Installation

```bash
# Install all dependencies
npm install

# Run spacedesign locally
npm run dev:spacedesign

# Run Python transliteration service
npm run dev:transliteration
```

### Deployment

Each app deploys independently to Vercel:

- **spacedesign** → spacedesign.vercel.app
- **signflow** → signflow.vercel.app
- **transliteration** → api.transliteration.com

Extensions are distributed via Chrome Web Store.

## 📦 Shared Packages

- `@zaya/core` - Core types, interfaces, errors
- `@zaya/country-adapters` - Country-specific payment logic
- `@zaya/stripe` - Stripe integration
- `@zaya/auth` - Authentication (to be created)
- `@zaya/ui` - Shared UI components
```

### 4. **Root `vercel.json`** (Optional - for monorepo settings)
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": {
      "apps/spacedesign": true,
      "apps/signflow": true,
      "apps/transliteration": true
    }
  }
}
```

