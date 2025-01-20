## Development

Run the dev server:

```shellscript
npm run dev
```

## Deploy

### build

```
docker build --platform=linux/amd64 -t aweist/lmnt .
```

### push

```
docker push aweist/lmnt
```

### deploy via docker compose

```docker
  lmnt:
    image: aweist/lmnt:latest
    environment:
      - PORT=3001
      - SHOPIFY_STOREFRONT_API_TOKEN={redacted}
      - SAMPLE_REQUEST_SERVICE_URL=http://localhost:3000
    ports:
      - "3001:3001"
    network_mode: "host"
```
