(defproject tmig "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[cheshire "5.5.0"]
                 [clj-time "0.11.0"]
                 [com.layerware/hugsql "0.4.4"]
                 [org.clojure/clojure "1.8.0"]
                 [org.postgresql/postgresql "9.4.1207"]
                 [ragtime "0.5.2"]]
  :main ^:skip-aot tmig.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}})
