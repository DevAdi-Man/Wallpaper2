# Appwrite Backend Setup

This directory contains the Appwrite backend setup using Podman/Docker Compose for the Wallpaper2 React Native app.

## Prerequisites

- Podman or Docker with compose support
- OpenSSL (for key generation)

## Quick Start

1. **Generate secure keys:**
   ```bash
   ./setup-keys.sh
   ```

2. **Start Appwrite:**
   ```bash
   podman-compose up -d
   # or with Docker
   docker-compose up -d
   ```

3. **Access Appwrite Console:**
   - Open http://localhost/console
   - Create your first project
   - Note down your Project ID and API Endpoint

## Configuration

### Environment Variables
Key variables in `docker-compose.yml`:
- `_APP_DOMAIN`: Set to your domain (default: localhost)
- `_APP_OPENSSL_KEY_V1`: Auto-generated encryption key
- `_APP_EXECUTOR_SECRET`: Auto-generated executor secret

### Database
- **Host:** mariadb (internal)
- **Database:** appwrite
- **User:** user
- **Password:** password

### Redis
- **Host:** redis (internal)
- **Port:** 6379

## Services

- **appwrite**: Main API server (port 80/443)
- **appwrite-realtime**: WebSocket connections
- **appwrite-worker-***: Background workers
- **mariadb**: Database
- **redis**: Cache and queues

## React Native Integration

Add to your React Native project:

```bash
npm install react-native-appwrite
```

```javascript
import { Client, Account, Databases } from 'react-native-appwrite';

const client = new Client();
client
  .setEndpoint('http://localhost/v1') // Your Appwrite Endpoint
  .setProject('your-project-id');     // Your Project ID

export const account = new Account(client);
export const databases = new Databases(client);
```

## Management Commands

```bash
# View logs
podman-compose logs -f appwrite

# Stop services
podman-compose down

# Update Appwrite
podman-compose pull
podman-compose up -d

# Reset (removes all data)
podman-compose down -v
```

## Volumes

Persistent data stored in:
- `appwrite-mariadb`: Database files
- `appwrite-uploads`: User uploads
- `appwrite-functions`: Cloud functions
- `appwrite-certificates`: SSL certificates

## Security Notes

- Change default database passwords in production
- Use HTTPS in production
- Set proper `_APP_DOMAIN` for your environment
- Keep your encryption keys secure
