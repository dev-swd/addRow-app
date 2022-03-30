◆構成
 >api
   >Dockerfile
   >entrypoint.sh
   >Gemfile
   >Gemfile.lock
 >Dockerfile
 >docker-compose.yml

◆操作手順
 プロジェクトディレクトリで以下のコマンド

 >初回のみ（Railsプロジェクト作成〜初期設定）

 ①apiディレクトリにRailsを出力
 docker-compose run --no-deps api rails new . --force -BCTM --api -d postgresql --skip-active-storage

 ②イメージ作成（Railsの初回bundle install）
 docker-compose build

 ③webpackerインストール（rails6以降必要)
 docker-compose run api bundle exec rails webpacker:install

 ④react + react-router-dom + axios + bootstrap
 docker-compose run --rm front sh -c "npm install -g create-react-app && create-react-app . && yarn add react-router-dom axios axios-case-converter react-bootstrap bootstrap@4.6.0"

 ⑤config/database.ymlを編集
  host: db #docker-composeのサービス名
  username: postgres
  password: postgres
  ※他は適宜

 ⑥DB作成
  1)コンテナ起動（dbのコンテナを起動する意図）
  docker-compose up
  ※ターミナルは処理中になる（Ctrl+Cで解除）
  2)DB作成（別ターミナルで実行）
  docker-compose run api rake db:create

⑦git管理
  1)api,front内の.gitを削除
  2)プロジェクトフォルダ直下で.gitignoreを作成／編集
    *dbを除外
  ※api,frontにもそれぞれ.gitignoreあり

 >コンテナ停止
 docker-compose stop

 >コンテナ削除
 docker-compose down

 >2回目以降のコンテナ起動
 docker-compose up
 ※ターミナルは処理中になる（Ctrl+Cで解除）

 >画面表示
 ブラウザで以下のURLに接続
 rails : http://localhost:3000/
 react : http://localhost:3001/

 >ホストからpostgresql接続
 psql -h localhost -p 5432 -U postgres -d [DB名]

◆補足
 コンテナを削除しても、ファイル・データは残る。
 ・Rails資源 >> ./api
 ・React資源 >> ./front
 ・db >> ./db