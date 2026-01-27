import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';

const quizData = [
  // 本（細長いもの）
  { item: "鉛筆", reading: "えんぴつ", answer: "本", choices: ["本", "枚", "個", "匹"] },
  { item: "傘", reading: "かさ", answer: "本", choices: ["本", "枚", "個", "台"] },
  { item: "ネクタイ", reading: "ネクタイ", answer: "本", choices: ["本", "枚", "着", "個"] },
  { item: "バナナ", reading: "バナナ", answer: "本", choices: ["本", "個", "枚", "房"] },
  { item: "木", reading: "き", answer: "本", choices: ["本", "枚", "個", "台"] },
  // 匹（小動物）
  { item: "猫", reading: "ねこ", answer: "匹", choices: ["匹", "頭", "羽", "人"] },
  { item: "犬", reading: "いぬ", answer: "匹", choices: ["匹", "頭", "羽", "人"] },
  { item: "魚", reading: "さかな", answer: "匹", choices: ["匹", "本", "羽", "頭"] },
  { item: "虫", reading: "むし", answer: "匹", choices: ["匹", "羽", "頭", "個"] },
  { item: "蛙", reading: "かえる", answer: "匹", choices: ["匹", "羽", "頭", "本"] },
  // 枚（薄いもの）
  { item: "紙", reading: "かみ", answer: "枚", choices: ["枚", "本", "冊", "個"] },
  { item: "皿", reading: "さら", answer: "枚", choices: ["枚", "本", "着", "個"] },
  { item: "切手", reading: "きって", answer: "枚", choices: ["枚", "個", "本", "冊"] },
  { item: "写真", reading: "しゃしん", answer: "枚", choices: ["枚", "冊", "本", "個"] },
  { item: "葉っぱ", reading: "はっぱ", answer: "枚", choices: ["枚", "本", "個", "束"] },
  // 冊（本・ノート）
  { item: "本", reading: "ほん", answer: "冊", choices: ["冊", "枚", "本", "台"] },
  { item: "雑誌", reading: "ざっし", answer: "冊", choices: ["冊", "枚", "部", "本"] },
  { item: "ノート", reading: "ノート", answer: "冊", choices: ["冊", "枚", "本", "個"] },
  { item: "辞書", reading: "じしょ", answer: "冊", choices: ["冊", "本", "枚", "部"] },
  { item: "漫画", reading: "まんが", answer: "冊", choices: ["冊", "枚", "本", "巻"] },
  // 台（機械・乗り物）
  { item: "車", reading: "くるま", answer: "台", choices: ["台", "本", "個", "匹"] },
  { item: "電話", reading: "でんわ", answer: "台", choices: ["台", "個", "本", "枚"] },
  { item: "パソコン", reading: "パソコン", answer: "台", choices: ["台", "個", "本", "枚"] },
  { item: "テレビ", reading: "テレビ", answer: "台", choices: ["台", "個", "本", "枚"] },
  { item: "自転車", reading: "じてんしゃ", answer: "台", choices: ["台", "本", "個", "輪"] },
  // 杯（飲み物・ご飯）
  { item: "珈琲", reading: "コーヒー", answer: "杯", choices: ["杯", "個", "本", "枚"] },
  { item: "お茶", reading: "おちゃ", answer: "杯", choices: ["杯", "本", "個", "枚"] },
  { item: "ご飯", reading: "ごはん", answer: "杯", choices: ["杯", "個", "枚", "膳"] },
  { item: "ラーメン", reading: "ラーメン", answer: "杯", choices: ["杯", "個", "本", "皿"] },
  { item: "味噌汁", reading: "みそしる", answer: "杯", choices: ["杯", "個", "椀", "皿"] },
  // 個（小さいもの）
  { item: "林檎", reading: "りんご", answer: "個", choices: ["個", "本", "枚", "匹"] },
  { item: "卵", reading: "たまご", answer: "個", choices: ["個", "枚", "本", "匹"] },
  { item: "消しゴム", reading: "けしゴム", answer: "個", choices: ["個", "本", "枚", "冊"] },
  { item: "石", reading: "いし", answer: "個", choices: ["個", "本", "枚", "匹"] },
  { item: "飴", reading: "あめ", answer: "個", choices: ["個", "本", "枚", "粒"] },
  // 人
  { item: "学生", reading: "がくせい", answer: "人", choices: ["人", "匹", "頭", "本"] },
  { item: "先生", reading: "せんせい", answer: "人", choices: ["人", "名", "匹", "頭"] },
  { item: "子供", reading: "こども", answer: "人", choices: ["人", "匹", "名", "頭"] },
  { item: "友達", reading: "ともだち", answer: "人", choices: ["人", "名", "匹", "組"] },
  { item: "客", reading: "きゃく", answer: "人", choices: ["人", "名", "組", "匹"] },
  // 頭（大きい動物）
  { item: "象", reading: "ぞう", answer: "頭", choices: ["頭", "匹", "羽", "本"] },
  { item: "牛", reading: "うし", answer: "頭", choices: ["頭", "匹", "羽", "本"] },
  { item: "馬", reading: "うま", answer: "頭", choices: ["頭", "匹", "羽", "本"] },
  { item: "ライオン", reading: "ライオン", answer: "頭", choices: ["頭", "匹", "羽", "本"] },
  { item: "熊", reading: "くま", answer: "頭", choices: ["頭", "匹", "羽", "本"] },
  // 羽（鳥・うさぎ）
  { item: "鳥", reading: "とり", answer: "羽", choices: ["羽", "匹", "頭", "枚"] },
  { item: "鶏", reading: "にわとり", answer: "羽", choices: ["羽", "匹", "頭", "本"] },
  { item: "兎", reading: "うさぎ", answer: "羽", choices: ["羽", "匹", "頭", "本"] },
  { item: "鳩", reading: "はと", answer: "羽", choices: ["羽", "匹", "頭", "枚"] },
  { item: "蝶", reading: "ちょう", answer: "羽", choices: ["羽", "匹", "頭", "枚"] },
  // 杯（イカ・タコ・船）
  { item: "烏賊", reading: "いか", answer: "杯", choices: ["杯", "匹", "本", "頭"] },
  { item: "蛸", reading: "たこ", answer: "杯", choices: ["杯", "匹", "本", "頭"] },
  { item: "蟹", reading: "かに", answer: "杯", choices: ["杯", "匹", "頭", "個"] },
  // 膳（箸・食事）
  { item: "箸", reading: "はし", answer: "膳", choices: ["膳", "本", "組", "対"] },
  { item: "お膳", reading: "おぜん", answer: "膳", choices: ["膳", "台", "個", "枚"] },
  // 基（大型構造物）
  { item: "鳥居", reading: "とりい", answer: "基", choices: ["基", "本", "門", "台"] },
  { item: "エレベーター", reading: "エレベーター", answer: "基", choices: ["基", "台", "機", "本"] },
  { item: "墓", reading: "はか", answer: "基", choices: ["基", "個", "体", "本"] },
  { item: "ピラミッド", reading: "ピラミッド", answer: "基", choices: ["基", "個", "棟", "台"] },
  { item: "灯籠", reading: "とうろう", answer: "基", choices: ["基", "本", "台", "個"] },
  // 反・疋（布・織物）
  { item: "反物", reading: "たんもの", answer: "反", choices: ["反", "枚", "本", "巻"] },
  { item: "絹織物", reading: "きぬおりもの", answer: "反", choices: ["反", "枚", "巻", "本"] },
  // 棹（タンス・三味線）
  { item: "箪笥", reading: "たんす", answer: "棹", choices: ["棹", "台", "個", "本"] },
  { item: "三味線", reading: "しゃみせん", answer: "棹", choices: ["棹", "本", "台", "挺"] },
  // 張（テント・弓・傘）
  { item: "テント", reading: "テント", answer: "張", choices: ["張", "個", "台", "本"] },
  { item: "弓", reading: "ゆみ", answer: "張", choices: ["張", "本", "挺", "丁"] },
  { item: "蚊帳", reading: "かや", answer: "張", choices: ["張", "枚", "本", "個"] },
  // 挺（銃・ろうそく・人力車）
  { item: "拳銃", reading: "けんじゅう", answer: "挺", choices: ["挺", "本", "丁", "個"] },
  { item: "蝋燭", reading: "ろうそく", answer: "挺", choices: ["挺", "本", "個", "灯"] },
  { item: "人力車", reading: "じんりきしゃ", answer: "挺", choices: ["挺", "台", "両", "個"] },
  // 艘・隻（船）
  { item: "漁船", reading: "ぎょせん", answer: "艘", choices: ["艘", "隻", "台", "本"] },
  { item: "軍艦", reading: "ぐんかん", answer: "隻", choices: ["隻", "艘", "台", "基"] },
  { item: "ボート", reading: "ボート", answer: "艘", choices: ["艘", "台", "隻", "本"] },
  // 棟（建物）
  { item: "ビル", reading: "ビル", answer: "棟", choices: ["棟", "軒", "基", "本"] },
  { item: "倉庫", reading: "そうこ", answer: "棟", choices: ["棟", "軒", "個", "基"] },
  // 軒（家・店）
  { item: "民家", reading: "みんか", answer: "軒", choices: ["軒", "棟", "戸", "件"] },
  { item: "商店", reading: "しょうてん", answer: "軒", choices: ["軒", "店", "棟", "件"] },
  // 脚（椅子・机）
  { item: "椅子", reading: "いす", answer: "脚", choices: ["脚", "台", "個", "本"] },
  { item: "机", reading: "つくえ", answer: "脚", choices: ["脚", "台", "個", "本"] },
  // 口（刀・井戸・口座）
  { item: "井戸", reading: "いど", answer: "口", choices: ["口", "個", "基", "本"] },
  { item: "口座", reading: "こうざ", answer: "口", choices: ["口", "個", "件", "本"] },
  // 振・口（刀剣）
  { item: "刀", reading: "かたな", answer: "振", choices: ["振", "本", "口", "挺"] },
  { item: "太刀", reading: "たち", answer: "振", choices: ["振", "本", "口", "挺"] },
  // 面（鏡・琴・面）
  { item: "鏡", reading: "かがみ", answer: "面", choices: ["面", "枚", "個", "台"] },
  { item: "琴", reading: "こと", answer: "面", choices: ["面", "台", "張", "本"] },
  { item: "能面", reading: "のうめん", answer: "面", choices: ["面", "枚", "個", "体"] },
  // 領（鎧・袴）
  { item: "鎧", reading: "よろい", answer: "領", choices: ["領", "着", "体", "具"] },
  { item: "袴", reading: "はかま", answer: "領", choices: ["領", "着", "枚", "本"] },
  // 柱（神様）
  { item: "神様", reading: "かみさま", answer: "柱", choices: ["柱", "体", "人", "尊"] },
  // 座（山・星座）
  { item: "富士山", reading: "ふじさん", answer: "座", choices: ["座", "山", "個", "基"] },
  { item: "星座", reading: "せいざ", answer: "座", choices: ["座", "個", "群", "点"] },
  // 貫（寿司）
  { item: "寿司", reading: "すし", answer: "貫", choices: ["貫", "個", "皿", "切"] },
  { item: "握り寿司", reading: "にぎりずし", answer: "貫", choices: ["貫", "個", "皿", "点"] },
  // 服・包（薬）
  { item: "漢方薬", reading: "かんぽうやく", answer: "服", choices: ["服", "包", "錠", "個"] },
  { item: "粉薬", reading: "こなぐすり", answer: "包", choices: ["包", "服", "袋", "個"] },
  // 帖（畳・海苔）
  { item: "畳", reading: "たたみ", answer: "帖", choices: ["帖", "枚", "畳", "面"] },
  { item: "海苔", reading: "のり", answer: "帖", choices: ["帖", "枚", "束", "個"] },
  // 丁（豆腐・包丁）
  { item: "豆腐", reading: "とうふ", answer: "丁", choices: ["丁", "個", "切", "塊"] },
  { item: "包丁", reading: "ほうちょう", answer: "丁", choices: ["丁", "本", "挺", "個"] },
  // 首（短歌・俳句）
  { item: "短歌", reading: "たんか", answer: "首", choices: ["首", "句", "編", "本"] },
  { item: "和歌", reading: "わか", answer: "首", choices: ["首", "句", "編", "節"] },
  // 句（俳句）
  { item: "俳句", reading: "はいく", answer: "句", choices: ["句", "首", "編", "節"] },
  { item: "川柳", reading: "せんりゅう", answer: "句", choices: ["句", "首", "本", "編"] },
  // 局（将棋・囲碁）
  { item: "将棋", reading: "しょうぎ", answer: "局", choices: ["局", "戦", "回", "番"] },
  { item: "囲碁", reading: "いご", answer: "局", choices: ["局", "戦", "回", "番"] },
  // 番（相撲）
  { item: "相撲", reading: "すもう", answer: "番", choices: ["番", "回", "戦", "局"] },
  // 幕（劇）
  { item: "芝居", reading: "しばい", answer: "幕", choices: ["幕", "回", "場", "本"] },
  { item: "オペラ", reading: "オペラ", answer: "幕", choices: ["幕", "曲", "回", "場"] },
  // 席（落語・寄席）
  { item: "落語", reading: "らくご", answer: "席", choices: ["席", "話", "本", "回"] },
  // 体（人形・仏像）
  { item: "仏像", reading: "ぶつぞう", answer: "体", choices: ["体", "柱", "尊", "基"] },
  { item: "人形", reading: "にんぎょう", answer: "体", choices: ["体", "個", "本", "匹"] },
  { item: "ミイラ", reading: "ミイラ", answer: "体", choices: ["体", "個", "人", "匹"] },
  // 門（大砲）
  { item: "大砲", reading: "たいほう", answer: "門", choices: ["門", "台", "基", "挺"] },
  // 条（法律・川）
  { item: "法律", reading: "ほうりつ", answer: "条", choices: ["条", "本", "件", "項"] },
  { item: "川", reading: "かわ", answer: "条", choices: ["条", "本", "筋", "流"] },
  // 着（服）
  { item: "シャツ", reading: "シャツ", answer: "着", choices: ["着", "枚", "本", "領"] },
  { item: "コート", reading: "コート", answer: "着", choices: ["着", "枚", "本", "領"] },
  { item: "着物", reading: "きもの", answer: "着", choices: ["着", "枚", "領", "反"] },
  { item: "ドレス", reading: "ドレス", answer: "着", choices: ["着", "枚", "本", "領"] },
  { item: "セーター", reading: "セーター", answer: "着", choices: ["着", "枚", "本", "個"] },
  // 足（靴・靴下）
  { item: "靴", reading: "くつ", answer: "足", choices: ["足", "個", "双", "本"] },
  { item: "靴下", reading: "くつした", answer: "足", choices: ["足", "枚", "双", "本"] },
  { item: "スリッパ", reading: "スリッパ", answer: "足", choices: ["足", "個", "双", "組"] },
  { item: "下駄", reading: "げた", answer: "足", choices: ["足", "個", "双", "本"] },
  { item: "草履", reading: "ぞうり", answer: "足", choices: ["足", "個", "双", "枚"] },
  // 束（花・野菜）
  { item: "花束", reading: "はなたば", answer: "束", choices: ["束", "本", "輪", "房"] },
  { item: "ほうれん草", reading: "ほうれんそう", answer: "束", choices: ["束", "本", "株", "把"] },
  { item: "藁", reading: "わら", answer: "束", choices: ["束", "本", "把", "個"] },
  { item: "薪", reading: "まき", answer: "束", choices: ["束", "本", "個", "山"] },
  // 房（ぶどう・バナナ）
  { item: "葡萄", reading: "ぶどう", answer: "房", choices: ["房", "個", "粒", "束"] },
  { item: "バナナの房", reading: "バナナのふさ", answer: "房", choices: ["房", "本", "束", "個"] },
  // 粒（米・豆・薬）
  { item: "米", reading: "こめ", answer: "粒", choices: ["粒", "個", "本", "杯"] },
  { item: "豆", reading: "まめ", answer: "粒", choices: ["粒", "個", "本", "匹"] },
  { item: "真珠", reading: "しんじゅ", answer: "粒", choices: ["粒", "個", "玉", "点"] },
  { item: "錠剤", reading: "じょうざい", answer: "粒", choices: ["粒", "錠", "個", "服"] },
  // 玉（キャベツ・レタス）
  { item: "キャベツ", reading: "キャベツ", answer: "玉", choices: ["玉", "個", "株", "枚"] },
  { item: "レタス", reading: "レタス", answer: "玉", choices: ["玉", "個", "株", "枚"] },
  { item: "スイカ", reading: "スイカ", answer: "玉", choices: ["玉", "個", "本", "切"] },
  // 株（植物）
  { item: "苗", reading: "なえ", answer: "株", choices: ["株", "本", "個", "束"] },
  { item: "白菜", reading: "はくさい", answer: "株", choices: ["株", "玉", "個", "本"] },
  { item: "盆栽", reading: "ぼんさい", answer: "株", choices: ["株", "鉢", "本", "個"] },
  // 切れ（肉・魚）
  { item: "刺身", reading: "さしみ", answer: "切れ", choices: ["切れ", "枚", "個", "皿"] },
  { item: "肉", reading: "にく", answer: "切れ", choices: ["切れ", "枚", "個", "塊"] },
  { item: "ハム", reading: "ハム", answer: "切れ", choices: ["切れ", "枚", "本", "個"] },
  // 筋（線・道・光）
  { item: "光", reading: "ひかり", answer: "筋", choices: ["筋", "本", "条", "線"] },
  { item: "涙", reading: "なみだ", answer: "筋", choices: ["筋", "滴", "粒", "本"] },
  { item: "煙", reading: "けむり", answer: "筋", choices: ["筋", "本", "条", "個"] },
  // 通（手紙・メール）
  { item: "手紙", reading: "てがみ", answer: "通", choices: ["通", "枚", "封", "本"] },
  { item: "メール", reading: "メール", answer: "通", choices: ["通", "件", "本", "個"] },
  { item: "葉書", reading: "はがき", answer: "通", choices: ["通", "枚", "封", "葉"] },
  // 部（新聞・書類）
  { item: "新聞", reading: "しんぶん", answer: "部", choices: ["部", "枚", "冊", "紙"] },
  { item: "書類", reading: "しょるい", answer: "部", choices: ["部", "枚", "通", "冊"] },
  { item: "コピー", reading: "コピー", answer: "部", choices: ["部", "枚", "冊", "通"] },
  // 巻（巻物・フィルム）
  { item: "巻物", reading: "まきもの", answer: "巻", choices: ["巻", "本", "冊", "枚"] },
  { item: "フィルム", reading: "フィルム", answer: "巻", choices: ["巻", "本", "枚", "個"] },
  { item: "トイレットペーパー", reading: "トイレットペーパー", answer: "巻", choices: ["巻", "本", "個", "枚"] },
  // 輪（花・輪ゴム）
  { item: "輪ゴム", reading: "わゴム", answer: "輪", choices: ["輪", "本", "個", "束"] },
  { item: "花輪", reading: "はなわ", answer: "輪", choices: ["輪", "個", "束", "本"] },
  // 缶・瓶・袋・箱
  { item: "缶詰", reading: "かんづめ", answer: "缶", choices: ["缶", "個", "本", "箱"] },
  { item: "ビール瓶", reading: "ビールびん", answer: "本", choices: ["本", "瓶", "缶", "個"] },
  { item: "ポテトチップス", reading: "ポテトチップス", answer: "袋", choices: ["袋", "個", "枚", "箱"] },
  { item: "菓子箱", reading: "かしばこ", answer: "箱", choices: ["箱", "個", "缶", "袋"] },
  // 発（弾丸・花火・ロケット）
  { item: "弾丸", reading: "だんがん", answer: "発", choices: ["発", "個", "本", "粒"] },
  { item: "花火", reading: "はなび", answer: "発", choices: ["発", "本", "個", "輪"] },
  { item: "ロケット", reading: "ロケット", answer: "発", choices: ["発", "機", "台", "基"] },
  // 曲（歌・音楽）
  { item: "歌", reading: "うた", answer: "曲", choices: ["曲", "首", "本", "番"] },
  { item: "交響曲", reading: "こうきょうきょく", answer: "曲", choices: ["曲", "番", "楽", "編"] },
  // 点（作品・得点）
  { item: "絵画", reading: "かいが", answer: "点", choices: ["点", "枚", "幅", "面"] },
  { item: "彫刻", reading: "ちょうこく", answer: "点", choices: ["点", "体", "個", "基"] },
  // 戦（試合）
  { item: "野球", reading: "やきゅう", answer: "戦", choices: ["戦", "試合", "回", "局"] },
  { item: "サッカー", reading: "サッカー", answer: "戦", choices: ["戦", "試合", "回", "点"] },
  // 便（飛行機・郵便）
  { item: "飛行機", reading: "ひこうき", answer: "便", choices: ["便", "機", "台", "本"] },
  { item: "郵便", reading: "ゆうびん", answer: "便", choices: ["便", "通", "本", "回"] },
  // 両・輌（電車）
  { item: "電車", reading: "でんしゃ", answer: "両", choices: ["両", "台", "本", "輌"] },
  { item: "貨車", reading: "かしゃ", answer: "両", choices: ["両", "台", "輌", "本"] },
  // 機（飛行機・機械）
  { item: "戦闘機", reading: "せんとうき", answer: "機", choices: ["機", "台", "便", "基"] },
  { item: "ヘリコプター", reading: "ヘリコプター", answer: "機", choices: ["機", "台", "便", "本"] },
  // 斤（パン）
  { item: "食パン", reading: "しょくパン", answer: "斤", choices: ["斤", "枚", "個", "本"] },
  // 尾（魚）
  { item: "鯛", reading: "たい", answer: "尾", choices: ["尾", "匹", "本", "枚"] },
  { item: "鮪", reading: "まぐろ", answer: "尾", choices: ["尾", "匹", "本", "頭"] },
  // 皿（料理）
  { item: "パスタ", reading: "パスタ", answer: "皿", choices: ["皿", "杯", "個", "品"] },
  { item: "カレー", reading: "カレー", answer: "皿", choices: ["皿", "杯", "個", "品"] },
  // 把（包丁・扇子）
  { item: "扇子", reading: "せんす", answer: "把", choices: ["把", "本", "枚", "面"] },
  // 連（切手）
  { item: "切手シート", reading: "きってシート", answer: "連", choices: ["連", "枚", "組", "帖"] },
  // 幅（掛け軸）
  { item: "掛け軸", reading: "かけじく", answer: "幅", choices: ["幅", "本", "枚", "巻"] },
  // 棟（神社・寺）
  { item: "神社", reading: "じんじゃ", answer: "社", choices: ["社", "軒", "棟", "基"] },
  { item: "寺", reading: "てら", answer: "寺", choices: ["寺", "軒", "棟", "院"] },
  // 錠（鍵・薬）
  { item: "鍵", reading: "かぎ", answer: "本", choices: ["本", "個", "錠", "把"] },
  { item: "薬の錠剤", reading: "くすりのじょうざい", answer: "錠", choices: ["錠", "粒", "個", "服"] },
  // 灯（明かり）
  { item: "提灯", reading: "ちょうちん", answer: "張", choices: ["張", "灯", "個", "本"] },
  { item: "街灯", reading: "がいとう", answer: "灯", choices: ["灯", "本", "基", "台"] },
  // 口（人数・寄付）
  { item: "寄付", reading: "きふ", answer: "口", choices: ["口", "件", "個", "回"] },
  // 膳（料理セット）
  { item: "定食", reading: "ていしょく", answer: "膳", choices: ["膳", "皿", "品", "個"] },
  // 揃（セット）
  { item: "茶器", reading: "ちゃき", answer: "揃", choices: ["揃", "組", "セット", "個"] },
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [streak, setStreak] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startNewGame = () => {
    const shuffled = [...quizData]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map(q => ({ ...q, choices: shuffleArray(q.choices) }));
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameOver(false);
    setGameStarted(true);
    setStreak(0);
  };

  const animateTransition = (callback) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(callback, 150);
  };

  const handleAnswer = (choice) => {
    if (showResult) return;

    setSelectedAnswer(choice);
    setShowResult(true);

    const isCorrect = choice === questions[currentQuestion].answer;
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 >= questions.length) {
      setGameOver(true);
    } else {
      animateTransition(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      });
    }
  };

  const goToTop = () => {
    setGameStarted(false);
    setGameOver(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { emoji: "🎊", message: "完璧！天才です！" };
    if (percentage >= 80) return { emoji: "🎉", message: "すばらしい！" };
    if (percentage >= 60) return { emoji: "😊", message: "よくできました！" };
    if (percentage >= 40) return { emoji: "💪", message: "もう少し！" };
    return { emoji: "📚", message: "練習しましょう！" };
  };

  if (!gameStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.startScreen}>
          <Text style={styles.startEmoji}>📚</Text>
          <Text style={styles.startTitle}>助数詞クイズ</Text>
          <Text style={styles.startSubtitle}>日本語の数え方を学ぼう！</Text>
          <View style={styles.startInfo}>
            <Text style={styles.startInfoText}>全10問</Text>
          </View>
          <TouchableOpacity style={styles.startButton} onPress={startNewGame}>
            <Text style={styles.startButtonText}>スタート</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (gameOver) {
    const { emoji, message } = getScoreMessage();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>{emoji}</Text>
          <Text style={styles.resultTitle}>クイズ終了！</Text>
          <View style={styles.finalScoreContainer}>
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreDivider}>/</Text>
            <Text style={styles.scoreTotal}>{questions.length}</Text>
          </View>
          <Text style={styles.resultMessage}>{message}</Text>
          <View style={styles.scoreBarContainer}>
            <View
              style={[
                styles.scoreBarFill,
                { width: `${(score / questions.length) * 100}%` },
              ]}
            />
          </View>
          <TouchableOpacity style={styles.restartButton} onPress={startNewGame}>
            <Text style={styles.restartButtonText}>もう一度挑戦する</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const question = questions[currentQuestion];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ヘッダー */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goToTop}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {currentQuestion + 1} / {questions.length}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${((currentQuestion + 1) / questions.length) * 100}%` },
                ]}
              />
            </View>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>スコア</Text>
            <Text style={styles.scoreValue}>{score}</Text>
            {streak >= 2 && (
              <View style={styles.streakBadge}>
                <Text style={styles.streakText}>連続 {streak}</Text>
              </View>
            )}
          </View>
        </View>

        {/* 問題カード */}
        <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
          <View style={styles.questionLabelContainer}>
            <Text style={styles.questionLabel}>問題</Text>
          </View>
          <View style={styles.questionTextContainer}>
            <Text style={styles.furigana}>{question.reading}</Text>
            <Text style={styles.kanjiText}>{question.item}</Text>
          </View>
        </Animated.View>

        {/* 選択肢 */}
        <View style={styles.choicesContainer}>
          {question.choices.map((choice, index) => {
            let buttonStyle = [styles.choiceButton];
            let textStyle = [styles.choiceText];

            if (showResult) {
              if (choice === question.answer) {
                buttonStyle.push(styles.correctButton);
                textStyle.push(styles.correctText);
              } else if (choice === selectedAnswer) {
                buttonStyle.push(styles.wrongButton);
                textStyle.push(styles.wrongText);
              } else {
                buttonStyle.push(styles.disabledButton);
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={buttonStyle}
                onPress={() => handleAnswer(choice)}
                disabled={showResult}
                activeOpacity={0.7}
              >
                <Text style={textStyle}>{choice}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 結果表示 */}
        {showResult && (
          <View style={styles.feedbackContainer}>
            <View
              style={[
                styles.feedbackBox,
                selectedAnswer === question.answer
                  ? styles.correctFeedback
                  : styles.wrongFeedback,
              ]}
            >
              <Text style={styles.feedbackEmoji}>
                {selectedAnswer === question.answer ? "⭕" : "❌"}
              </Text>
              <Text style={styles.feedbackText}>
                {selectedAnswer === question.answer
                  ? "正解！"
                  : `残念... 正解は「${question.answer}」`}
              </Text>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
              <Text style={styles.nextButtonText}>
                {currentQuestion + 1 >= questions.length
                  ? "結果を見る"
                  : "次の問題へ"}
              </Text>
              <Text style={styles.nextArrow}>→</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* フッター */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>助数詞クイズ</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  loading: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: '40%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  progressContainer: {
    flex: 1,
    marginRight: 16,
  },
  progressText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#e94560',
    borderRadius: 3,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  scoreValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  streakBadge: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  questionLabelContainer: {
    marginBottom: 20,
  },
  questionLabel: {
    backgroundColor: '#e94560',
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
    letterSpacing: 2,
  },
  questionTextContainer: {
    alignItems: 'center',
  },
  furigana: {
    fontSize: 18,
    color: '#636e72',
    marginBottom: 4,
  },
  kanjiText: {
    fontSize: 56,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  choicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  choiceButton: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  choiceText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  correctButton: {
    backgroundColor: '#00b894',
  },
  correctText: {
    color: '#fff',
  },
  wrongButton: {
    backgroundColor: '#e94560',
  },
  wrongText: {
    color: '#fff',
  },
  disabledButton: {
    opacity: 0.5,
  },
  feedbackContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  feedbackBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  correctFeedback: {
    backgroundColor: 'rgba(0,184,148,0.2)',
  },
  wrongFeedback: {
    backgroundColor: 'rgba(233,69,96,0.2)',
  },
  feedbackEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f3460',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 16,
    shadowColor: '#0f3460',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  nextArrow: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    padding: 16,
  },
  footerText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    letterSpacing: 4,
  },
  // 結果画面
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 40,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 12,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  resultEmoji: {
    fontSize: 72,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 24,
  },
  finalScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  scoreNumber: {
    fontSize: 64,
    fontWeight: '800',
    color: '#e94560',
  },
  scoreDivider: {
    fontSize: 32,
    color: '#b2bec3',
    marginHorizontal: 4,
  },
  scoreTotal: {
    fontSize: 32,
    fontWeight: '600',
    color: '#636e72',
  },
  resultMessage: {
    fontSize: 18,
    color: '#636e72',
    marginBottom: 24,
  },
  scoreBarContainer: {
    width: '100%',
    height: 12,
    backgroundColor: '#dfe6e9',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 32,
  },
  scoreBarFill: {
    height: '100%',
    backgroundColor: '#00b894',
    borderRadius: 6,
  },
  restartButton: {
    backgroundColor: '#e94560',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // スタート画面
  startScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  startEmoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  startTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 12,
    letterSpacing: 4,
  },
  startSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 40,
  },
  startInfo: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginBottom: 40,
  },
  startInfoText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#e94560',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 20,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 4,
  },
});
