# EcoSignal Campaign Impact And Trust Analytics

EcoSignal is a full-stack sustainability campaign intelligence platform built for JSA Enterprise. It helps marketing, ESG, legal, and executive teams evaluate whether green campaigns are performing, whether sustainability claims are backed by evidence, and whether public messaging is ready to scale.

## What This Project Solves

Companies often run sustainability campaigns without a clear way to connect marketing performance, environmental impact, evidence quality, budget efficiency, and greenwashing risk. EcoSignal turns those signals into a decision workflow.

## Core Features

- Campaign impact overview
- Channel performance analytics
- Green claim proof review
- Evidence vault
- Impact confidence scoring
- Brand trust and greenwashing risk monitor
- Budget reallocation intelligence
- Executive impact reporting
- Role-aware simulated workflows
- Audit logging for claim review events
- AWS-ready health endpoint and deployment documentation

## Tech Stack

- React + Vite frontend
- Node.js + Express backend
- JSON data layer
- Helmet security headers
- CORS origin restriction
- API rate limiting
- Zod request validation
- Docker-ready backend
- GitHub Actions CI workflow

## Local Development

```powershell
npm run install:all
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:8080`

Health check: `http://localhost:8080/health`

## Security Considerations

This project includes secure headers, CORS restrictions, rate limiting, input validation, simulated role-aware authorization, structured audit logs, controlled error handling, and no real customer/legal/ESG data.

## AWS Readiness

EcoSignal is structured for a future AWS deployment with a React frontend on S3 + CloudFront, a Node API on ECS Fargate, `/health` for load balancer checks, `.env.example` for configuration, CloudWatch-ready logs, Dockerfile, and AWS deployment documentation.

## Portfolio Value

EcoSignal is designed as a SaaS module for a larger JSA Enterprise Operations Platform. It demonstrates product thinking, full-stack development, cloud readiness, responsible sustainability messaging, business analytics, security controls, and executive reporting.