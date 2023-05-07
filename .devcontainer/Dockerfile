FROM debian:bullseye-slim

# Install system dependencies
RUN apt update && apt upgrade -y && apt install -y zsh git vim curl

# Install Node.js
ARG NODE_VERSION=20
RUN curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - && apt install -y nodejs

# Install PNPM
RUN npm install -g pnpm
