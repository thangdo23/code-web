FROM ubuntu:latest
RUN apt-get update && apt-get install -y python3
# Set the default command to display python3 version
RUN mkdir /app
COPY www /app
CMD ["python3", "-m", "http.server", "8000", "-d", "/app"]
