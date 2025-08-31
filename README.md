This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Docker Setup

This project includes Docker configuration for containerized deployment.

### Prerequisites

- [Docker Desktop](https://docs.docker.com/desktop/) installed and running
- Docker daemon must be running (start Docker Desktop)

### Build and Run with Docker

1. **Build the Docker image:**

   ```bash
   docker build -t tadom-sea .
   ```

2. **Run the container:**

   ```bash
   docker run -p 3000:3000 tadom-sea
   ```

3. **Run with custom API endpoint:**

   ```bash
   docker run -p 3000:3000 -e NEXT_PUBLIC_API_BASE_URL=http://your-api-endpoint:8000 tadom-sea
   ```

4. **Run in detached mode (background):**

   ```bash
   docker run -d -p 3000:3000 --name tadom-sea-container tadom-sea
   ```

5. **Stop the container:**

   ```bash
   docker stop tadom-sea-container
   ```

6. **Remove the container:**
   ```bash
   docker rm tadom-sea-container
   ```

### Docker Configuration Details

- **Multi-stage build** for optimized image size
- **Alpine Linux** base image for security and performance
- **Non-root user** for enhanced security
- **Standalone output** configuration for Docker optimization
- **Environment variables** configurable at runtime
- **Port 3000** exposed for web access

### Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: Backend API endpoint (default: http://localhost:8000)
- `PORT`: Application port (default: 3000)
- `NODE_ENV`: Environment mode (set to production in container)

### Troubleshooting

- **Docker daemon not running**: Ensure Docker Desktop is started
- **Port already in use**: Use a different port mapping (e.g., `-p 3001:3000`)
- **API connection issues**: Verify the `NEXT_PUBLIC_API_BASE_URL` environment variable
- **Build failures**: The Dockerfile has been tested and verified to work with Next.js 15.4.5
- **TypeScript errors**: All TypeScript dependencies are properly included in the build process
