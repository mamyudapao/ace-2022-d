# 開発フロー

## 依存関係

- [Node.js LTS](https://nodejs.org/en/)
- [yarn 1.x](https://yarnpkg.com/)
- [OpenJDK 11](https://openjdk.java.net/install/)
- [Docker](https://www.docker.com/)

## 初期セットアップ

※依存関係のインストールが終わっている前提です。

1. リポジトリをクローンする

```bash
git clone https://github.com/CyberAgentHack/ace_2022_team_d
```

2. ディレクトリを移動する

```bash
cd ace_2022_team_d
```

3. 依存関係をインストールする (このタイミングで、nestjs の定義から api クライアントが生成されます。 `./packages/swagger.json` が生成されます)

```bash
yarn install
```

## ブランチを切る

命名規則は [コード規約](code_convention.md#ブランチ) を参照してください。

## 開発サーバーの起動

※初期セットアップが終わっている前提です。

1. ローカルで MySQL を起動する

```bash
docker-compose -f ./packages/infrastructure/docker/docker-compose.local.yml up -d mysql
```

2. バックエンドサーバーを起動する

```bash
yarn backend start:dev
```

3. フロントエンドサーバーを起動する

```bash
yarn frontend start:dev
```

3. ウェブサイトを開く

```
フロントエンド: http://localhost:3000
バックエンド: http://localhost:3001
データベース: postgresql://postgres:postgres@localhost:54322/postgres
```

## コミットする

できるだけ細分化するようにし、コミットメッセージは [コード規約](code_convention.md#コミット) を参照してください。

## PR を作成する

テンプレートから作成し、なるべく明確な名前にしてください。レビューをもらったら、PR はマージしてください。
