#!/usr/bin/env bash

set -e

CLI_ERR_MSG="Postgres CLI tools not available (psql). Using Postgres.app, look at http://postgresapp.com/documentation/cli-tools.html. Aborting."
hash psql 2>/dev/null || { echo >&2 $CLI_ERR_MSG ; exit 1; }

echo "Asumes backend/provision have been performed."

# Master DB
psql -c "
CREATE DATABASE dash_lord
OWNER dash
TEMPLATE template0;
"

psql -d dash_lord -c"
CREATE EXTENSION IF NOT EXISTS hstore;"

# Tenants
psql -c "
CREATE DATABASE dash_tenant_1
OWNER dash
TEMPLATE template0;
"

psql -c "
CREATE DATABASE dash_tenant_2
OWNER dash
TEMPLATE template0;
"

echo ""
echo "----------"
echo "Done!"
