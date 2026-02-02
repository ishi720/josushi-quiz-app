# Expo アプリの Google Play 公開手順

このドキュメントでは、Expo (React Native) で作成した「Josushi Quiz」アプリを Google Play ストアに公開する手順。

## 前提条件

- Node.js がインストールされていること
- Google Play デベロッパーアカウント（登録料 $25）

## 1. EAS CLI のインストール

```bash
npm install -g eas-cli
eas login
```

## 2. app.json の設定

`app.json` に以下の設定を追加します：

```json
{
  "expo": {
    "name": "Josushi Quiz",
    "slug": "josushi-quiz",
    "version": "1.0.0",
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1a1a2e"
      },
      "package": "com.yourname.josushiquiz",
      "versionCode": 1
    },
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1a1a2e"
    }
  }
}
```

### 必須項目

| 項目 | 説明 |
|------|------|
| `android.package` | ユニークなパッケージ名（例: `com.yourname.josushiquiz`） |
| `android.versionCode` | 整数のバージョン番号（更新ごとに +1） |
| `icon` | アプリアイコン（1024x1024 PNG推奨） |

## 3. EAS Build の設定

```bash
eas build:configure
```

`eas.json` が自動生成されます。

## 4. 本番用 AAB をビルド

```bash
eas build --platform android --profile production
```

- 初回は署名キーが自動生成されます
- ビルド完了後、AABファイルのダウンロードリンクが表示されます

## 5. Google Play Console にアップロード

1. [Google Play Console](https://play.google.com/console) でアプリを作成
2. **リリース > 製品版** から AAB をアップロード
3. ストア掲載情報を入力

## 6. EAS Submit で自動アップロード（オプション）

```bash
eas submit --platform android
```

Google Play の API キーを設定すれば、自動でアップロード可能です。

## 必要なアセット一覧

| ファイル | サイズ | 用途 |
|---------|--------|------|
| icon.png | 1024x1024 | アプリアイコン |
| adaptive-icon.png | 1024x1024 | Android用アダプティブアイコン |
| splash.png | 1284x2778 | スプラッシュ画面 |
| スクリーンショット | 1080x1920 | ストア掲載用（最低2枚） |
| フィーチャーグラフィック | 1024x500 | ストアのヘッダー画像 |

## ストア掲載に必要な情報

- **アプリ名**: 最大30文字
- **短い説明**: 最大80文字
- **詳しい説明**: 最大4000文字
- **カテゴリ**: 教育 / トリビア など
- **プライバシーポリシーURL**: 必須
- **コンテンツレーティング**: アンケート回答で取得

## 更新時の手順

1. `app.json` の `version` と `android.versionCode` を更新
2. `eas build --platform android --profile production` で再ビルド
3. Google Play Console で新しい AAB をアップロード
