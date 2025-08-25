# Docker Deployment Guide

This Next.js application is configured to run in Docker containers for easy deployment.

## Quick Start

### Using Docker Compose (Recommended)

1. Build and start the container:
```bash
docker-compose up -d
```

2. Access the application at `http://localhost:3000`

3. Stop the container:
```bash
docker-compose down
```

### Using Docker CLI

1. Build the Docker image:
```bash
docker build -t agency-app .
```

2. Run the container:
```bash
docker run -p 3000:3000 agency-app
```

## Production Deployment

### Build for production:
```bash
docker build -t agency-app:prod .
```

### Run with environment variables:
```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  agency-app:prod
```

## Docker Image Details

- **Base Image**: Node.js 20 Alpine (lightweight)
- **Multi-stage Build**: Optimized image size (~150MB)
- **Security**: Runs as non-root user
- **Port**: 3000 (configurable via PORT env variable)

## Customization

### Change Port
```bash
docker run -p 8080:3000 -e PORT=3000 agency-app
```

### Volume Mounting (for development)
```bash
docker run -p 3000:3000 \
  -v $(pwd)/public:/app/public \
  agency-app
```

## Deployment to Cloud Providers

### AWS ECS / Fargate
1. Push image to ECR
2. Create ECS task definition
3. Deploy service

### Google Cloud Run
```bash
gcloud run deploy agency-app \
  --image gcr.io/PROJECT-ID/agency-app \
  --platform managed \
  --port 3000
```

### Azure Container Instances
```bash
az container create \
  --name agency-app \
  --image agency-app:prod \
  --port 3000 \
  --cpu 1 \
  --memory 1
```

## Health Check

The application includes a health check endpoint at `/api/health` (if implemented) or you can check the root path `/`.

## Troubleshooting

1. **Port already in use**: Change the host port in docker-compose.yml or use a different port mapping
2. **Build fails**: Ensure all dependencies are properly listed in package.json
3. **Container exits immediately**: Check logs with `docker logs <container-id>`

## Image Optimization Tips

- The current setup uses multi-stage builds for optimal size
- Only production dependencies are included
- Static assets are properly copied
- Next.js standalone output reduces image size significantly