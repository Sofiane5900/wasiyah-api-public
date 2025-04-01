#!/bin/bash
set -e

DB_SERVICE=db
DB_PORT=5432
DB_USER=database_user
DB_PASSWORD=database_pass
DB_NAME=wasiyah_db
MIGRATION_FILE="src/migrations/*.js"
KEY_DIR="./jwt"

while true; do
    RESPONSE=$(pg_isready -h $DB_SERVICE -p $DB_PORT -U $DB_USER)

    if echo "$RESPONSE" | grep -q "accepting connections"; then
        echo "PostgreSQL is ready !"
        break
    fi
done

echo "Checking if the database '$DB_NAME' exists..."
DB_EXISTS=$(PGPASSWORD=$DB_PASSWORD psql -h $DB_SERVICE -p $DB_PORT -U $DB_USER -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")

if [ "$DB_EXISTS" != "1" ]; then
    echo "Creating database '$DB_NAME'..."
    PGPASSWORD=$DB_PASSWORD psql -h $DB_SERVICE -p $DB_PORT -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME;"
else
    echo "Database '$DB_NAME' already exists."
fi

if ls $MIGRATION_FILE 1> /dev/null 2>&1; then
    echo "🚀 Running TypeORM migrations..."
    pnpm migration:run
else
    echo "No migration files found, skipping migration step."
fi

if [ ! -f "$KEY_DIR/private.pem" ] || [ ! -f "$KEY_DIR/public.pem" ]; then
  echo "Generating RSA keys..."
  mkdir -p "$KEY_DIR"
  openssl genpkey -algorithm RSA -out "$KEY_DIR/private.pem" -pkeyopt rsa_keygen_bits:4096
  openssl rsa -in "$KEY_DIR/private.pem" -pubout -out "$KEY_DIR/public.pem"
  chmod 600 "$KEY_DIR/private.pem"
  echo "RSA keys generated in $KEY_DIR"
else
  echo "RSA keys already exist."
fi

exec "$@"
