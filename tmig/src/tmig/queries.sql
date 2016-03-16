-- :name create-tenants-table
-- :command :execute
-- :result :raw
-- :doc Create characters table
--  auto_increment and current_timestamp are
CREATE TABLE IF NOT EXISTS tenants (
       title text,
       conn jsonb);

-- :name truncate-tenants-table
-- :command :execute
-- :result :raw
-- :doc Create characters table
--  auto_increment and current_timestamp are
TRUNCATE tenants RESTART IDENTITY;;


-- :name all-tenants :? :*
-- :doc Get all tenants
SELECT * FROM tenants

-- :name all-tables :? :*
-- :doc Get all tables
SELECT * FROM pg_catalog.pg_tables)

-- :name insert-tenant :! :n
-- :doc Insert a single tenant
INSERT INTO tenants (title, conn)
VALUES(:title, :conn)
