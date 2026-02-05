# Quizzo

A clean, minimal web application for transforming documents into interactive quizzes.

## Features

- **Easy Upload**: Drag and drop PDF, Word docs, or paste text content
- **Instant Generation**: Create comprehensive quizzes from your content in seconds
- **Smart Analytics**: Track performance with detailed results and insights
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Typography**: Inter font family

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quizzo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Design Principles

- **Minimal & Modern**: Clean interface with plenty of white space
- **Human-Designed**: Professional look without flashy or artificial elements
- **Consistent Spacing**: 8px grid system throughout
- **Neutral Palette**: Off-white, slate, charcoal, and muted blue colors
- **Subtle Details**: Soft shadows, rounded corners, and gentle transitions

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── FileUpload.tsx
│   ├── QuizCard.tsx
│   ├── Navigation.tsx
│   ├── LoadingState.tsx
│   └── EmptyState.tsx
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── UploadPage.tsx
│   ├── QuizPage.tsx
│   └── ResultsPage.tsx
├── App.tsx             # Main app component
├── index.tsx           # App entry point
└── index.css           # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.