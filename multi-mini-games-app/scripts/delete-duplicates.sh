#!/bin/bash

# Function to delete duplicate files
delete_duplicates() {
  local dir=$1
  echo "Scanning for duplicate files and folders in: $dir"

  # Find duplicate files by name and delete them
  find "$dir" -type f | awk -F/ '{print $NF}' | sort | uniq -d | while read -r duplicate; do
    find "$dir" -type f -name "$duplicate" -exec rm -v {} +
  done

  # Find duplicate folders by name and delete them
  find "$dir" -type d | awk -F/ '{print $NF}' | sort | uniq -d | while read -r duplicate; do
    find "$dir" -type d -name "$duplicate" -exec rm -rv {} +
  done
}

# Specify the root directory of your project
ROOT_DIR="multi-mini-games-app"

# Run the duplicate cleanup
delete_duplicates "$ROOT_DIR"

echo "Duplicate cleanup completed!"