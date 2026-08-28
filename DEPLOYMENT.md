# Docker and Portainer deployment

## Local verification

Build and start the site with Docker Desktop:

```powershell
docker build --tag steamul-web:local .
docker run --detach --name steamul-web --publish 8080:8080 steamul-web:local
```

Open `http://localhost:8080` and verify the container health endpoint:

```powershell
Invoke-WebRequest http://localhost:8080/health
```

Stop the local test when finished:

```powershell
docker stop steamul-web
docker rm steamul-web
```

## Registry publishing

The Docker Hub repository is `vit100/steamul-web`. Choose a release tag (for
example `1.0.0`) and publish it with:

```powershell
docker build --tag vit100/steamul-web:1.0.0 .
docker push vit100/steamul-web:1.0.0
```

The container listens internally on port `8080`, includes a health check at
`/health`, and serves the site root plus the `/booking/` and `/menu/` pages.
