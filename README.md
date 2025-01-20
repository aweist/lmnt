# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment via Docker

### build

```
docker build -t aweist/lmnt .
```

### push

```
docker push aweist/lmnt
```

### run locally

```
docker run -p 3000:3000 -it --rm aweist/lmnt
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
