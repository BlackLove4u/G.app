#!/bin/bash

# Create the root directory
mkdir -p multi-mini-games-app

# Navigate into the root directory
cd multi-mini-games-app || exit

# Create the app folder structure
mkdir -p app/assets
mkdir -p app/components
mkdir -p app/screens
mkdir -p app/games
mkdir -p app/navigation
mkdir -p app/services
mkdir -p app/context
mkdir -p app/utils
touch app/App.tsx

# Create the server folder structure
mkdir -p server/controllers
mkdir -p server/models
mkdir -p server/routes
mkdir -p server/middleware
mkdir -p server/services
touch server/server.js

# Create the docs folder structure
mkdir -p docs
touch docs/game-flow.md
touch docs/api-spec.md
touch docs/roadmap.md

# Create the shared folder
mkdir -p shared

# Create the root-level files
touch .gitignore
touch README.md
touch package.json

echo "Folder and file structure created successfully!"