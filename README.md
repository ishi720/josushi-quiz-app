# 助数詞クイズ

日本語の助数詞を学ぶためのクイズアプリです。

## セットアップ

### 1. Node.jsをインストール
https://nodejs.org からLTS版をダウンロード・インストール

### 2. スマホにExpo Goをインストール
- iOS: App Storeで「Expo Go」を検索
- Android: Google Playで「Expo Go」を検索

### 3. 依存関係をインストール
```bash
cd josushi-quiz-app
npm install
```

### 4. 起動
```bash
npx  expo start --tunnel
```

コンソールで`c`を入力し、QRコードを表示。

### 5. スマホで確認
- iOS: カメラアプリでQRコードをスキャン
- Android: Expo GoアプリでQRコードをスキャン

## ビルド（本番用）

### Expo Application Services (EAS) を使用
```bash
npm install -g eas-cli
eas login
eas build --platform android  # Android APK
eas build --platform ios      # iOS IPA
```

## 機能
- 15種類の助数詞問題からランダム10問出題
- 連続正解カウント
- スコア表示と結果画面
