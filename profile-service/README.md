# MacroMate Profile Service

Serverless Profile microservice for MacroMate built with **Node.js**, **AWS Lambda**, and **DynamoDB**.

## 📦 Features
- CRUD operations for user profile
- JWT-based authentication using AWS Cognito
- Lightweight and cost-efficient (under AWS Free Tier)

## ⚙️ Environment Variables
| Name | Description |
|------|--------------|
| `PROFILE_TABLE` | DynamoDB table name |
| `COGNITO_JWKS_URL` | Cognito JWKS URL for verifying JWTs |

## 🚀 Build & Deploy
1. Install dependencies:
   ```bash
   npm install
