# Use standart node image
FROM node

# Copy source code to container
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Exporse port 80
EXPOSE 3600

# Launch this beautiful application
CMD ["npm", "start"]