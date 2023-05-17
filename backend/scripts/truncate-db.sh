#!/bin/bash

# Check if the DB URL is provided as an argument
if [ -z "$1" ]; then
  echo "Please provide the PostgreSQL DB URL as an argument."
  echo "Usage: ./execute-truncate-db.sh <db_url>"
  exit 1
fi

# Extract the DB URL from the argument
db_url="$1"

# Get the directory path of the current script
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

# Execute the SQL script
psql "${db_url}" -f "${script_dir}/truncate-db.sql"