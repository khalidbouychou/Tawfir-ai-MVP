# Tawfir.AI Application Architecture

## Overview

Tawfir.AI is a mobile-first financial profiling application that helps users determine their investment profile through a series of questionnaires and provides personalized investment recommendations based on their answers. The application follows a modern client-server architecture with a React frontend and Express.js backend.

## Architecture Diagram

```
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│                                 │     │                                 │
│          Client (React)         │     │          Server (Express)       │
│                                 │     │                                 │
│  ┌─────────┐     ┌──────────┐   │     │  ┌──────────┐     ┌──────────┐  │
│  │ Pages   │     │ React    │   │     │  │ Express  │     │ Storage  │  │
│  │ ┌─────┐ │     │ Query    │   │     │  │ Routes   │     │ Service  │  │
│  │ │Home │ │     │ Client   │   │     │  │          │     │          │  │
│  │ └─────┘ │     │          │   │     │  │ ┌──────┐ │     │ ┌──────┐ │  │
│  │ ┌─────┐ │     │          │   │     │  │ │API   │ │     │ │In-   │ │  │
│  │ │Form │ │     │          │   │     │  │ │Routes│ │     │ │Memory │ │  │
│  │ └─────┘ │     │          │   │     │  │ └──────┘ │     │ │DB    │ │  │
│  │ ┌─────┐ │     │          │◄──┼─────┼──┼─────────►│     │ └──────┘ │  │
│  │ │Dash │ │     │          │   │     │  │          │     │          │  │
│  │ └─────┘ │     │          │   │     │  │          │     │          │  │
│  └─────────┘     └──────────┘   │     │  └──────────┘     └──────────┘  │
│                                 │     │                                 │
│  ┌─────────┐     ┌──────────┐   │     │  ┌──────────┐     ┌──────────┐  │
│  │ UI      │     │ Utils    │   │     │  │ Profile  │     │ Schemas  │  │
│  │ Comps   │     │          │   │     │  │ Utils    │     │ (Shared) │  │
│  │ ┌─────┐ │     │ ┌──────┐ │   │     │  │          │     │          │  │
│  │ │Cards│ │     │ │Profile│ │   │     │  │ ┌──────┐ │     │ ┌──────┐ │  │
│  │ └─────┘ │     │ │Utils │ │   │     │  │ │Risk   │ │     │ │Zod   │ │  │
│  │ ┌─────┐ │     │ └──────┘ │   │     │  │ │Profile│ │     │ │Models│ │  │
│  │ │Forms│ │     │ ┌──────┐ │   │     │  │ └──────┘ │     │ └──────┘ │  │
│  │ └─────┘ │     │ │Rec.  │ │   │     │  │          │     │          │  │
│  │         │     │ │Engine│ │   │     │  │          │     │          │  │
│  │         │     │ └──────┘ │   │     │  │          │     │          │  │
│  └─────────┘     └──────────┘   │     │  └──────────┘     └──────────┘  │
│                                 │     │                                 │
└─────────────────────────────────┘     └─────────────────────────────────┘
```

## Key Components

### Frontend (Client)

1. **Pages**
   - WelcomePage: Introductory landing page
   - QuestionnairePage: 5-step questionnaire process
   - ResultsPage: Display user profile and recommendations
   - InvestmentPage: Allow user to select investment options
   - DashboardPage: View portfolio performance

2. **UI Components**
   - QuestionnaireCard: Renders different question types
   - ProfileCard: Displays user profile information
   - ResultCard: Shows investment recommendations
   - InvestmentCard: Investment configuration interface
   - DashboardCard: Portfolio visualization

3. **Hooks and Utilities**
   - useQuestionnaireForm: Manages questionnaire state and navigation
   - useResponsiveChart: Handles responsive chart sizing
   - profileUtils: Functions to analyze user responses
   - recommendationEngine: Generates portfolio recommendations

### Backend (Server)

1. **API Routes**
   - `/api/questionnaire`: Process questionnaire submissions
   - `/api/profile/recommendations`: Retrieve user profile and recommendations
   - `/api/investments`: Create new investments
   - `/api/portfolio`: Get portfolio information

2. **Storage**
   - MemStorage: In-memory implementation of storage interface
   - IStorage: Interface defining data operations

3. **Shared**
   - Schema definitions (using Drizzle ORM and Zod)
   - Data validation schemas

## Data Flow

1. User completes the 5-step questionnaire
2. Frontend sends responses to backend
3. Backend processes responses:
   - Calculates risk profile
   - Determines investment horizon
   - Identifies main objectives
   - Evaluates ESG sensitivity
   - Calculates compatibility score
4. Backend generates personalized investment recommendations
5. Frontend displays results with visualizations
6. User can proceed to invest based on recommendations
7. Dashboard tracks portfolio performance over time

## Mobile-First Design

The application uses:
- Responsive layout with Tailwind CSS
- Bottom navigation for mobile accessibility
- Progressive form handling for small screens
- Optimized charts and visualizations for mobile viewing