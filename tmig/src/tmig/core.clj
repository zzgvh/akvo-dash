(ns tmig.core
  (:gen-class)
  (:require
   [cheshire.core :as json]
   [clojure.pprint :refer [pprint]]
   [hugsql.core :as hugsql]
   [ragtime.jdbc :as jdbc]
   [ragtime.repl :as repl]
   [tmig.db-util]))

(hugsql/def-db-fns "tmig/queries.sql")

;;;----------------------------------------------------------------------------
;;; Seed data

(def tentant-data
  [{:title "Tenant 1"
    :conn  {:database_url "jdbc:postgresql://localhost/dash_tenant_1?user=dash&password=password"}}
   {:title "Tenant 2"
    :conn  {:database_url "jdbc:postgresql://localhost/dash_tenant_2?user=dash&password=password"}}])


;;;----------------------------------------------------------------------------
;;; Lord database setup

(def lord-db {:classname   "org.postgresql.Driver"
              :subprotocol "postgresql"
              :subname     "//localhost:5432/dash_lord"
              :user        "dash"
              :password    "password"})

(defn migrate-lord [db]
  (create-tenants-table db))

(defn seed-lord [db tenants]
  (try
    (doseq [t tenants]
      (insert-tenant db t))
    (catch Exception e
      (pprint (.getNextException e)))))


;;;----------------------------------------------------------------------------
;;; Migrate tenants


(defn tenants [db]
  (all-tenants db))

(defn migrate-tenants [tenants]
  (doseq [t tenants]
    (let [uri    (get-in t [:conn "database_url"])
          config {:datastore  (jdbc/sql-database {:connection-uri uri})
                  :migrations (jdbc/load-resources "migrations")}]
      (repl/migrate config))))


(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (migrate-lord lord-db)
  (truncate-tenants-table lord-db)
  (seed-lord lord-db tentant-data)
  (migrate-tenants (tenants lord-db))
  (println "Done!"))
