## Tawfir.AI Database Schema

The Tawfir.AI application uses a PostgreSQL database. Below is a detailed schema of the database tables and their relationships.

### Users Table
Stores basic user authentication information.

```
Table: users
+-----------+--------------+------------------------------------------------------------+
| Column    | Type         | Description                                                |
+-----------+--------------+------------------------------------------------------------+
| id        | SERIAL       | Primary key, auto-incrementing user identifier             |
| username  | TEXT         | Unique username for authentication                         |
| password  | TEXT         | Hashed password for authentication                         |
+-----------+--------------+------------------------------------------------------------+
```

### User Profiles Table
Stores user profile data generated from the questionnaire responses.

```
Table: user_profiles
+---------------------+--------------+------------------------------------------------------------+
| Column              | Type         | Description                                                |
+---------------------+--------------+------------------------------------------------------------+
| id                  | TEXT         | Primary key, unique profile identifier                     |
| user_id             | TEXT         | Foreign key to users table                                 |
| risk_profile        | TEXT         | User's calculated risk profile (Conservateur, Modéré, etc.)|
| investment_horizon  | TEXT         | Investment time horizon preference                         |
| main_objective      | TEXT         | Primary financial goal                                     |
| esg_sensitivity     | TEXT         | Level of interest in ESG (Environmental, Social, Gov.)     |
| compatibility_score | INTEGER      | Score indicating recommendation compatibility              |
| answers             | JSON         | Raw questionnaire answers for reference                    |
+---------------------+--------------+------------------------------------------------------------+
```

### Products Table
Stores investment product information.

```
Table: products
+----------------+--------------+------------------------------------------------------------+
| Column         | Type         | Description                                                |
+----------------+--------------+------------------------------------------------------------+
| id             | TEXT         | Primary key, unique product identifier                     |
| name           | TEXT         | Product name                                               |
| description    | TEXT         | Product description                                        |
| risk_level     | TEXT         | Risk level (low, medium, high, etc.)                       |
| expected_return| TEXT         | Expected return range (e.g., "2-3%")                       |
| min_investment | INTEGER      | Minimum investment amount                                  |
+----------------+--------------+------------------------------------------------------------+
```

### Investments Table
Stores user investment transactions.

```
Table: investments
+----------------+--------------+------------------------------------------------------------+
| Column         | Type         | Description                                                |
+----------------+--------------+------------------------------------------------------------+
| id             | TEXT         | Primary key, unique investment identifier                  |
| user_id        | TEXT         | Foreign key to users table                                 |
| amount         | INTEGER      | Total investment amount                                    |
| date           | TIMESTAMP    | Investment date                                            |
| status         | TEXT         | Status (pending, completed, failed)                        |
| allocations    | JSON         | Array of product allocations with product IDs, amounts, % |
+----------------+--------------+------------------------------------------------------------+
```

### Relationships

```
Users 1:1 UserProfiles - Each user has one profile
Users 1:N Investments - Each user can have multiple investments
Products M:N Investments - Through the allocations JSON structure
```

## In-Memory Data Structures

For the MVP implementation, the data is stored in memory using Map collections:

```typescript
// User-related maps
private users: Map<number, User>
private userProfiles: Map<string, UserProfile>

// Product and investment maps
private products: Map<string, Product>
private investments: Map<string, Investment>
```