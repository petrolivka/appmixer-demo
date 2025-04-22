# AppMixer Demo

An AppMixer's integration platform demo to showcase basic features. Demo consist of movie recommendation service. Main component uses chat with AI where you can prompt for movies recommendation. AI will suggest movie and could tap on some facts about the moview using tools. 

## Features

- **Integrations Management**: Create and manage integrations between various services
- **Automation Builder**: Visual designer for creating automated workflows
- **Flow Manager**: Manage your automation flows easily
- **AI-Powered Chat**: Movie recommendation chatbot with markdown rendering support
- **Email Recommendations**: Send movie recommendations directly to email

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- AppMixer account with API credentials

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd appmixer-demo
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
  - `components/`: Reusable UI components
    - `Chat.js`: AI-powered movie recommendation chat component
- `providers/`: React context providers
  - `appmixer-provider.js`: Provides AppMixer instance and widgets to the application
- `lib/`: External libraries and utilities (contains AppMixer SDK)

## Usage

1. Navigate to the home page to get started
2. Create integrations through the `/integrations` page
3. Build and manage automation flows through the `/automations` page
4. Each flow can be edited using the visual designer at `/automations/[flowId]`
5. Interact with the movie recommendation chatbot on the home page
6. Send movie recommendations to your email with one click

## Chat Component Features

- Markdown rendering for AI responses
- Email recommendations with a single click
- Real-time communication with AI recommendation agent
- Clean, responsive UI with message history

## Troubleshooting

- If you see "Cannot read properties of null (reading 'append')" error, it's likely a DOM mounting issue. Try refreshing the page or checking the designer container size.
- For authentication issues, verify your AppMixer credentials in the `.env` file.

## Limitations
- This demo uses one virtual user that is set using env properties. 

