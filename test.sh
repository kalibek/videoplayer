#docker build . -t test

docker run \
  -p 8080:80 \
  -v $(pwd)/data:/data \
  test