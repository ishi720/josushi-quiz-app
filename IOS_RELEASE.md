# Expo アプリの App Store 公開手順

このドキュメントでは、Expo (React Native) で作成した「Josushi Quiz」アプリを App Store に公開する手順。

## 前提条件

- Node.js がインストールされていること
- Mac（Xcode が必要な場合あり）
- Apple Developer Program（年間 $99 ）

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
    "ios": {
      "bundleIdentifier": "com.yourname.josushiquiz",
      "buildNumber": "1",
      "supportsTablet": true,
      "infoPlist": {
        "NSCameraUsageDescription": "カメラを使用する理由（使用する場合）"
      }
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
| `ios.bundleIdentifier` | ユニークなバンドルID（例: `com.yourname.josushiquiz`） |
| `ios.buildNumber` | ビルド番号（更新ごとに +1） |
| `icon` | アプリアイコン（1024x1024 PNG、透過なし） |

---

## 3. Apple Developer での準備

1. [Apple Developer](https://developer.apple.com/) にログイン
2. **Certificates, Identifiers & Profiles** でApp IDを作成
3. EAS が自動で証明書を管理してくれるので、手動設定は不要

---

## 4. EAS Build の設定

```bash
eas build:configure
```

`eas.json` が自動生成されます。

---

## 5. 本番用 IPA をビルド

```bash
eas build --platform ios --profile production
```

- 初回は Apple Developer アカウントでのログインが必要
- 証明書とプロビジョニングプロファイルは EAS が自動管理
- ビルド完了後、IPAファイルのダウンロードリンクが表示されます

---

## 6. App Store Connect にアップロード

### 方法1: EAS Submit（推奨）

```bash
eas submit --platform ios
```

Apple ID でログインすると自動でアップロードされます。

### 方法2: Transporter アプリ（Mac）

1. Mac App Store から「Transporter」をインストール
2. ビルドした IPA ファイルをドラッグ＆ドロップ
3. Apple ID でログインしてアップロード

## 7. App Store Connect での設定

1. [App Store Connect](https://appstoreconnect.apple.com/) にログイン
2. 「マイApp」から新規アプリを作成
3. 以下の情報を入力：

### 必須情報

- **アプリ名**: 最大30文字
- **サブタイトル**: 最大30文字
- **説明**: 最大4000文字
- **キーワード**: 最大100文字（カンマ区切り）
- **サポートURL**: 必須
- **プライバシーポリシーURL**: 必須

### スクリーンショット

| デバイス | サイズ | 必須枚数 |
|---------|--------|----------|
| iPhone 6.7インチ | 1290x2796 | 最低1枚 |
| iPhone 6.5インチ | 1284x2778 | 最低1枚 |
| iPhone 5.5インチ | 1242x2208 | 最低1枚 |
| iPad Pro 12.9インチ | 2048x2732 | タブレット対応時 |

## 8. 審査に提出

1. ビルドを選択
2. 年齢制限レーティングを設定
3. App Review 情報を入力
4. 「審査に提出」をクリック

### 審査期間

- 通常: 24〜48時間
- 初回やリジェクト後: 数日かかる場合あり

## 必要なアセット一覧

| ファイル | サイズ | 用途 |
|---------|--------|------|
| icon.png | 1024x1024（透過なし） | アプリアイコン |
| splash.png | 1284x2778 | スプラッシュ画面 |
| スクリーンショット | 各サイズ | ストア掲載用 |

## よくあるリジェクト理由と対策

| 理由 | 対策 |
|------|------|
| メタデータの問題 | 説明文やスクリーンショットの修正 |
| クラッシュ | テストを十分に行う |
| プライバシーポリシーがない | URLを用意して設定 |
| 最低限の機能がない | 機能を追加する |
| 著作権の問題 | オリジナルコンテンツを使用 |

## 更新時の手順

1. `app.json` の `version` と `ios.buildNumber` を更新
2. `eas build --platform ios --profile production` で再ビルド
3. `eas submit --platform ios` でアップロード
4. App Store Connect で新しいビルドを選択して審査提出

## TestFlight でのテスト配布（推奨）

本番公開前にテスターに配布できます：

1. App Store Connect でビルドをアップロード
2. 「TestFlight」タブを開く
3. 内部テスター（最大100人）または外部テスター（最大10,000人）を追加
4. テスターにメールが届き、TestFlight アプリからインストール可能
