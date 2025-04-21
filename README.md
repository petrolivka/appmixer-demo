# AppMixer Demo

A Next.js application that leverages AppMixer's integration platform to create a SaaS platform for building, managing, and automating integrations between different services.

## Features

- **Integrations Management**: Create and manage integrations between various services
- **Automation Builder**: Visual designer for creating automated workflows
- **Flow Manager**: Manage your automation flows easily

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- AppMixer account with API credentials

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-appmixer-saas
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with your AppMixer credentials:
```
NEXT_PUBLIC_VIRTUAL_USER_NAME=your-username
NEXT_PUBLIC_VIRTUAL_USER_TOKEN=your-token
```

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js application pages and components
  - `page.js`: Home page
  - `integrations/`: Integrations management
  - `automations/`: Automation flows management and design
- `providers/`: React context providers
  - `appmixer-provider.js`: Provides AppMixer instance and widgets to the application
- `lib/`: External libraries and utilities (contains AppMixer SDK)

## Usage

1. Navigate to the home page to get started
2. Create integrations through the `/integrations` page
3. Build and manage automation flows through the `/automations` page
4. Each flow can be edited using the visual designer at `/automations/[flowId]`

## Troubleshooting

- If you see "Cannot read properties of null (reading 'append')" error, it's likely a DOM mounting issue. Try refreshing the page or checking the designer container size.
- For authentication issues, verify your AppMixer credentials in the `.env` file.


