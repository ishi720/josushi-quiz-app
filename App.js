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
  { item: "兎", reading: "うさぎ", answer: ["羽", "匹"], choices: ["羽", "匹", "頭", "本"] },
  { item: "鳩", reading: "はと", answer: "羽", choices: ["羽", "匹", "頭", "枚"] },
  { item: "蝶", reading: "ちょう", answer: ["羽", "匹"], choices: ["羽", "匹", "頭", "枚"] },
  // 杯（イカ・タコ・船）
  { item: "烏賊", reading: "いか", answer: ["杯", "匹"], choices: ["杯", "匹", "本", "頭"] },
  { item: "蛸", reading: "たこ", answer: ["杯", "匹"], choices: ["杯", "匹", "本", "頭"] },
  { item: "蟹", reading: "かに", answer: ["杯", "匹"], choices: ["杯", "匹", "頭", "個"] },
  // 膳（箸・食事）
  { item: "箸", reading: "はし", answer: ["膳", "組"], choices: ["膳", "本", "組", "対"] },
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
  { item: "ボート", reading: "ボート", answer: ["艘", "隻"], choices: ["艘", "台", "隻", "本"] },
  // 棟（建物）
  { item: "ビル", reading: "ビル", answer: "棟", choices: ["棟", "軒", "基", "本"] },
  { item: "倉庫", reading: "そうこ", answer: "棟", choices: ["棟", "軒", "個", "基"] },
  { item: "蔵", reading: "くら", answer: ["戸", "棟"], choices: ["戸", "棟", "軒", "基"] },
  // 軒（家・店）
  { item: "民家", reading: "みんか", answer: "軒", choices: ["軒", "棟", "戸", "件"] },
  { item: "商店", reading: "しょうてん", answer: "軒", choices: ["軒", "店", "棟", "件"] },
  // 脚（椅子・机）
  { item: "椅子", reading: "いす", answer: ["脚", "台"], choices: ["脚", "台", "個", "本"] },
  { item: "机", reading: "つくえ", answer: ["脚", "台"], choices: ["脚", "台", "個", "本"] },
  // 口（刀・井戸・口座）
  { item: "井戸", reading: "いど", answer: "口", choices: ["口", "個", "基", "本"] },
  { item: "口座", reading: "こうざ", answer: "口", choices: ["口", "個", "件", "本"] },
  // 振・口（刀剣）
  { item: "刀", reading: "かたな", answer: ["振", "口", "本"], choices: ["振", "本", "口", "挺"] },
  { item: "太刀", reading: "たち", answer: ["振", "口", "本"], choices: ["振", "本", "口", "挺"] },
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
  { item: "畳", reading: "たたみ", answer: ["帖", "畳", "枚"], choices: ["帖", "枚", "畳", "面"] },
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
  { item: "仏像", reading: "ぶつぞう", answer: ["体", "尊"], choices: ["体", "柱", "尊", "基"] },
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
  { item: "飛行機", reading: "ひこうき", answer: ["便", "機"], choices: ["便", "機", "台", "本"] },
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
  { item: "神社", reading: "じんじゃ", answer: ["社", "軒"], choices: ["社", "軒", "棟", "基"] },
  { item: "寺", reading: "てら", answer: ["寺", "軒"], choices: ["寺", "軒", "棟", "院"] },
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
  // 階（フロア）
  { item: "階段", reading: "かいだん", answer: "階", choices: ["階", "段", "本", "個"] },
  { item: "建物の階", reading: "たてもののかい", answer: "階", choices: ["階", "層", "段", "棟"] },
  { item: "マンションの階", reading: "マンションのかい", answer: "階", choices: ["階", "層", "棟", "室"] },
  // 泊（宿泊）
  { item: "ホテル宿泊", reading: "ホテルしゅくはく", answer: "泊", choices: ["泊", "晩", "夜", "日"] },
  { item: "旅行", reading: "りょこう", answer: "泊", choices: ["泊", "日", "回", "度"] },
  // 回（回数）
  { item: "練習回数", reading: "れんしゅうかいすう", answer: "回", choices: ["回", "度", "遍", "番"] },
  { item: "試行", reading: "しこう", answer: "回", choices: ["回", "度", "遍", "発"] },
  { item: "注射", reading: "ちゅうしゃ", answer: "回", choices: ["回", "本", "発", "度"] },
  // 度（頻度・温度）
  { item: "気温", reading: "きおん", answer: "度", choices: ["度", "回", "点", "℃"] },
  { item: "角度", reading: "かくど", answer: "度", choices: ["度", "回", "点", "分"] },
  // 件（事件・案件）
  { item: "事件", reading: "じけん", answer: "件", choices: ["件", "個", "例", "回"] },
  { item: "案件", reading: "あんけん", answer: "件", choices: ["件", "個", "本", "例"] },
  { item: "事故", reading: "じこ", answer: "件", choices: ["件", "個", "回", "例"] },
  // 組（グループ・セット）
  { item: "カップル", reading: "カップル", answer: "組", choices: ["組", "対", "人", "双"] },
  { item: "チーム", reading: "チーム", answer: "組", choices: ["組", "班", "隊", "団"] },
  { item: "クラス", reading: "クラス", answer: "組", choices: ["組", "班", "級", "室"] },
  // 対（ペア）
  { item: "イヤリング", reading: "イヤリング", answer: "対", choices: ["対", "個", "組", "双"] },
  { item: "花瓶", reading: "かびん", answer: ["対", "個"], choices: ["対", "個", "本", "輪"] },
  { item: "屏風", reading: "びょうぶ", answer: "対", choices: ["対", "枚", "双", "面"] },
  // 双（手袋など）
  { item: "手袋", reading: "てぶくろ", answer: "双", choices: ["双", "組", "枚", "個"] },
  // 名（人数・正式）
  { item: "参加者", reading: "さんかしゃ", answer: "名", choices: ["名", "人", "員", "方"] },
  { item: "乗客", reading: "じょうきゃく", answer: "名", choices: ["名", "人", "員", "客"] },
  { item: "応募者", reading: "おうぼしゃ", answer: "名", choices: ["名", "人", "員", "方"] },
  // 歳・才（年齢）
  { item: "年齢", reading: "ねんれい", answer: "歳", choices: ["歳", "年", "才", "代"] },
  // 代（年代）
  { item: "年代", reading: "ねんだい", answer: "代", choices: ["代", "歳", "年", "世"] },
  { item: "世代", reading: "せだい", answer: "代", choices: ["代", "世", "期", "年"] },
  // 位（順位）
  { item: "順位", reading: "じゅんい", answer: "位", choices: ["位", "番", "等", "級"] },
  { item: "ランキング", reading: "ランキング", answer: "位", choices: ["位", "番", "等", "段"] },
  // 等（等級）
  { item: "賞", reading: "しょう", answer: "等", choices: ["等", "位", "級", "番"] },
  // 級（クラス・レベル）
  { item: "検定", reading: "けんてい", answer: "級", choices: ["級", "段", "等", "位"] },
  { item: "柔道の段位", reading: "じゅうどうのだんい", answer: ["段", "級"], choices: ["段", "級", "等", "位"] },
  // 段（階段・段位）
  { item: "階段の段", reading: "かいだんのだん", answer: "段", choices: ["段", "階", "本", "個"] },
  { item: "棚の段", reading: "たなのだん", answer: "段", choices: ["段", "階", "列", "本"] },
  // 号（号数・サイズ）
  { item: "雑誌の号", reading: "ざっしのごう", answer: "号", choices: ["号", "巻", "冊", "部"] },
  { item: "サイズ", reading: "サイズ", answer: "号", choices: ["号", "番", "個", "枚"] },
  { item: "台風", reading: "たいふう", answer: "号", choices: ["号", "個", "発", "回"] },
  // 章（チャプター）
  { item: "小説の章", reading: "しょうせつのしょう", answer: "章", choices: ["章", "節", "編", "巻"] },
  { item: "論文の章", reading: "ろんぶんのしょう", answer: "章", choices: ["章", "節", "部", "編"] },
  // 節（セクション）
  { item: "音楽の節", reading: "おんがくのふし", answer: "節", choices: ["節", "章", "曲", "小節"] },
  { item: "文章の節", reading: "ぶんしょうのせつ", answer: "節", choices: ["節", "章", "段", "項"] },
  // 編（エピソード・編集物）
  { item: "映画シリーズ", reading: "えいがシリーズ", answer: "編", choices: ["編", "作", "本", "話"] },
  { item: "続編", reading: "ぞくへん", answer: "編", choices: ["編", "作", "巻", "話"] },
  // 話（エピソード・物語）
  { item: "ドラマ", reading: "ドラマ", answer: "話", choices: ["話", "回", "編", "本"] },
  { item: "アニメ", reading: "アニメ", answer: "話", choices: ["話", "回", "編", "本"] },
  { item: "昔話", reading: "むかしばなし", answer: "話", choices: ["話", "編", "本", "篇"] },
  // 行（テキストの行）
  { item: "文章の行", reading: "ぶんしょうのぎょう", answer: "行", choices: ["行", "列", "段", "本"] },
  { item: "プログラムのコード", reading: "プログラムのコード", answer: "行", choices: ["行", "列", "本", "個"] },
  // 字（文字）
  { item: "漢字", reading: "かんじ", answer: "字", choices: ["字", "文", "語", "個"] },
  { item: "文字", reading: "もじ", answer: "字", choices: ["字", "文", "語", "個"] },
  // 語（単語）
  { item: "単語", reading: "たんご", answer: "語", choices: ["語", "字", "言", "文"] },
  { item: "外来語", reading: "がいらいご", answer: "語", choices: ["語", "言", "字", "文"] },
  // 問（問題）
  { item: "試験問題", reading: "しけんもんだい", answer: "問", choices: ["問", "題", "個", "件"] },
  { item: "クイズ", reading: "クイズ", answer: "問", choices: ["問", "題", "個", "件"] },
  // 品（商品・料理）
  { item: "商品", reading: "しょうひん", answer: "品", choices: ["品", "個", "点", "件"] },
  { item: "料理", reading: "りょうり", answer: "品", choices: ["品", "皿", "膳", "個"] },
  // 種（種類）
  { item: "種類", reading: "しゅるい", answer: "種", choices: ["種", "品", "類", "個"] },
  { item: "植物の種", reading: "しょくぶつのたね", answer: "粒", choices: ["粒", "種", "個", "本"] },
  // 校（学校）
  { item: "学校", reading: "がっこう", answer: "校", choices: ["校", "軒", "棟", "院"] },
  { item: "高校", reading: "こうこう", answer: "校", choices: ["校", "軒", "棟", "院"] },
  // 社（会社）
  { item: "会社", reading: "かいしゃ", answer: "社", choices: ["社", "軒", "店", "件"] },
  { item: "企業", reading: "きぎょう", answer: "社", choices: ["社", "軒", "件", "店"] },
  // 店（お店）
  { item: "レストラン", reading: "レストラン", answer: "店", choices: ["店", "軒", "件", "棟"] },
  { item: "コンビニ", reading: "コンビニ", answer: "店", choices: ["店", "軒", "件", "棟"] },
  // 院（病院・寺院）
  { item: "病院", reading: "びょういん", answer: "院", choices: ["院", "軒", "棟", "件"] },
  { item: "美容院", reading: "びよういん", answer: "院", choices: ["院", "軒", "店", "件"] },
  // 室（部屋）
  { item: "会議室", reading: "かいぎしつ", answer: "室", choices: ["室", "部屋", "間", "個"] },
  { item: "研究室", reading: "けんきゅうしつ", answer: "室", choices: ["室", "部屋", "棟", "階"] },
  // 間（和室）
  { item: "和室", reading: "わしつ", answer: "間", choices: ["間", "室", "畳", "部屋"] },
  { item: "茶室", reading: "ちゃしつ", answer: "間", choices: ["間", "室", "畳", "棟"] },
  // 坪（面積）
  { item: "土地", reading: "とち", answer: "坪", choices: ["坪", "畳", "平米", "反"] },
  // 戸（世帯）
  { item: "世帯", reading: "せたい", answer: "戸", choices: ["戸", "軒", "家", "世帯"] },
  { item: "アパートの部屋", reading: "アパートのへや", answer: "戸", choices: ["戸", "室", "軒", "部屋"] },
  // 滴（しずく）
  { item: "目薬", reading: "めぐすり", answer: "滴", choices: ["滴", "粒", "個", "本"] },
  { item: "水滴", reading: "すいてき", answer: "滴", choices: ["滴", "粒", "個", "筋"] },
  // 匙（さじ）
  { item: "砂糖（スプーン）", reading: "さとう", answer: "匙", choices: ["匙", "杯", "個", "粒"] },
  { item: "塩（スプーン）", reading: "しお", answer: "匙", choices: ["匙", "杯", "粒", "個"] },
  // 人前（料理の分量）
  { item: "パスタの量", reading: "パスタのりょう", answer: "人前", choices: ["人前", "皿", "食", "膳"] },
  // 鉢（植木鉢・器）
  { item: "植木鉢", reading: "うえきばち", answer: "鉢", choices: ["鉢", "個", "株", "本"] },
  { item: "サボテン", reading: "サボテン", answer: "鉢", choices: ["鉢", "株", "本", "個"] },
  // 椀（おわん）
  { item: "お椀", reading: "おわん", answer: "椀", choices: ["椀", "杯", "個", "膳"] },
  { item: "汁物", reading: "しるもの", answer: "椀", choices: ["椀", "杯", "皿", "膳"] },
  // 樽（たる）
  { item: "ワイン樽", reading: "ワインだる", answer: "樽", choices: ["樽", "本", "個", "缶"] },
  { item: "ビール樽", reading: "ビールだる", answer: "樽", choices: ["樽", "本", "缶", "個"] },
  // 俵（米俵）
  { item: "米俵", reading: "こめだわら", answer: "俵", choices: ["俵", "袋", "個", "束"] },
  // 籠（かご）
  { item: "買い物かご", reading: "かいものかご", answer: "籠", choices: ["籠", "個", "袋", "箱"] },
  // 群れ（動物の群れ）
  { item: "羊の群れ", reading: "ひつじのむれ", answer: "群れ", choices: ["群れ", "頭", "匹", "組"] },
  { item: "魚の群れ", reading: "さかなのむれ", answer: "群れ", choices: ["群れ", "匹", "尾", "組"] },
  // 班（グループ）
  { item: "調査班", reading: "ちょうさはん", answer: "班", choices: ["班", "組", "隊", "団"] },
  // 隊（部隊）
  { item: "救助隊", reading: "きゅうじょたい", answer: "隊", choices: ["隊", "班", "組", "団"] },
  { item: "消防隊", reading: "しょうぼうたい", answer: "隊", choices: ["隊", "班", "組", "団"] },
  // 団（団体）
  { item: "楽団", reading: "がくだん", answer: "団", choices: ["団", "組", "隊", "班"] },
  { item: "劇団", reading: "げきだん", answer: "団", choices: ["団", "組", "座", "隊"] },
  // 騎（騎馬）
  { item: "騎馬武者", reading: "きばむしゃ", answer: "騎", choices: ["騎", "頭", "人", "匹"] },
  // 重（層・重ね）
  { item: "重箱", reading: "じゅうばこ", answer: "重", choices: ["重", "段", "個", "層"] },
  { item: "弁当箱", reading: "べんとうばこ", answer: "重", choices: ["重", "段", "個", "層"] },
  // 層（レイヤー）
  { item: "ケーキの層", reading: "ケーキのそう", answer: "層", choices: ["層", "段", "重", "枚"] },
  { item: "地層", reading: "ちそう", answer: "層", choices: ["層", "段", "重", "枚"] },
  // 列（れつ）
  { item: "行列", reading: "ぎょうれつ", answer: "列", choices: ["列", "行", "本", "組"] },
  { item: "座席の列", reading: "ざせきのれつ", answer: "列", choices: ["列", "行", "段", "本"] },
  // 合（ごう・升の1/10）
  { item: "お米（計量）", reading: "おこめ", answer: "合", choices: ["合", "升", "杯", "粒"] },
  { item: "日本酒", reading: "にほんしゅ", answer: "合", choices: ["合", "升", "杯", "本"] },
  // 升（しょう）
  { item: "升酒", reading: "ますざけ", answer: "升", choices: ["升", "合", "杯", "本"] },
  // 石（こく）
  { item: "大名の石高", reading: "だいみょうのこくだか", answer: "石", choices: ["石", "俵", "升", "合"] },
  // 尺（しゃく）
  { item: "尺八", reading: "しゃくはち", answer: "尺", choices: ["尺", "本", "寸", "管"] },
  // 寸（すん）
  { item: "釘", reading: "くぎ", answer: ["寸", "本"], choices: ["寸", "本", "個", "尺"] },
  // 里（り）
  { item: "距離（古い単位）", reading: "きょり", answer: "里", choices: ["里", "町", "間", "歩"] },
  // 票（ひょう）
  { item: "選挙の票", reading: "せんきょのひょう", answer: "票", choices: ["票", "個", "点", "件"] },
  { item: "投票", reading: "とうひょう", answer: "票", choices: ["票", "個", "件", "回"] },
  // 案（あん）
  { item: "提案", reading: "ていあん", answer: "案", choices: ["案", "件", "個", "本"] },
  { item: "企画案", reading: "きかくあん", answer: "案", choices: ["案", "件", "本", "個"] },
  // 例（れい）
  { item: "事例", reading: "じれい", answer: "例", choices: ["例", "件", "個", "回"] },
  // 場（ば・シーン）
  { item: "演劇のシーン", reading: "えんげきのシーン", answer: "場", choices: ["場", "幕", "回", "景"] },
  // 打（ダース）
  { item: "卵ダース", reading: "たまごダース", answer: "打", choices: ["打", "個", "パック", "組"] },
  { item: "鉛筆ダース", reading: "えんぴつダース", answer: "打", choices: ["打", "本", "組", "箱"] },
  // 割（わり・割合）
  { item: "割合", reading: "わりあい", answer: "割", choices: ["割", "分", "％", "パーセント"] },
  // 勝（しょう）
  { item: "勝利", reading: "しょうり", answer: "勝", choices: ["勝", "回", "戦", "点"] },
  // 敗（はい）
  { item: "敗北", reading: "はいぼく", answer: "敗", choices: ["敗", "回", "戦", "点"] },
  // 頁（ページ）
  { item: "ページ", reading: "ページ", answer: "頁", choices: ["頁", "枚", "面", "葉"] },
  // 葉（よう・はがき）
  { item: "名刺", reading: "めいし", answer: "枚", choices: ["枚", "葉", "通", "個"] },
  // 封（ふう）
  { item: "封筒", reading: "ふうとう", answer: "封", choices: ["封", "通", "枚", "個"] },
  // 軸（じく）
  { item: "掛け軸（別の数え方）", reading: "かけじく", answer: "軸", choices: ["軸", "幅", "本", "巻"] },
  // 具（ぐ）
  { item: "甲冑", reading: "かっちゅう", answer: "具", choices: ["具", "領", "体", "組"] },
  { item: "馬具", reading: "ばぐ", answer: "具", choices: ["具", "組", "個", "式"] },
  // 式（しき）
  { item: "結婚式", reading: "けっこんしき", answer: "式", choices: ["式", "回", "件", "度"] },
  { item: "卒業式", reading: "そつぎょうしき", answer: "式", choices: ["式", "回", "件", "度"] },
  // 目（め・網目）
  { item: "網目", reading: "あみめ", answer: "目", choices: ["目", "個", "本", "筋"] },
  // 結び（むすび）
  { item: "そうめん", reading: "そうめん", answer: "束", choices: ["束", "結び", "把", "本"] },
  // 盃（さかずき）
  { item: "盃", reading: "さかずき", answer: "盃", choices: ["盃", "杯", "個", "椀"] },
  // 艇（てい）
  { item: "ヨット", reading: "ヨット", answer: "艇", choices: ["艇", "隻", "艘", "台"] },
  { item: "カヌー", reading: "カヌー", answer: "艇", choices: ["艇", "隻", "艘", "本"] },
  // 食（しょく）
  { item: "食事", reading: "しょくじ", answer: "食", choices: ["食", "膳", "回", "度"] },
  { item: "朝食", reading: "ちょうしょく", answer: "食", choices: ["食", "膳", "回", "品"] },
  // 献（こん）
  { item: "コース料理", reading: "コースりょうり", answer: "献", choices: ["献", "品", "皿", "膳"] },
  // 会（かい）
  { item: "会議", reading: "かいぎ", answer: "会", choices: ["会", "回", "件", "度"] },
  { item: "パーティー", reading: "パーティー", answer: "会", choices: ["会", "回", "件", "度"] },
  // 期（き）
  { item: "学期", reading: "がっき", answer: "期", choices: ["期", "回", "年", "度"] },
  { item: "シーズン", reading: "シーズン", answer: "期", choices: ["期", "回", "季", "年"] },
  // 世（よ・せい）
  { item: "王様の代", reading: "おうさまのだい", answer: "世", choices: ["世", "代", "期", "年"] },
  // 紀（き）
  { item: "世紀", reading: "せいき", answer: "紀", choices: ["紀", "世", "代", "年"] },
  // 枠（わく）
  { item: "テレビ枠", reading: "テレビわく", answer: "枠", choices: ["枠", "本", "回", "個"] },
  { item: "広告枠", reading: "こうこくわく", answer: "枠", choices: ["枠", "本", "個", "件"] },
  // 筆（ふで・ひつ）
  { item: "土地の筆", reading: "とちのふで", answer: "筆", choices: ["筆", "坪", "区画", "個"] },
  // 棟（むね・とう）
  { item: "マンション", reading: "マンション", answer: "棟", choices: ["棟", "軒", "戸", "階"] },
  // 戸（こ・と）
  { item: "団地の戸数", reading: "だんちのこすう", answer: "戸", choices: ["戸", "軒", "室", "棟"] },
  // 腹（はら・ぷく）
  { item: "たらこ", reading: "たらこ", answer: "腹", choices: ["腹", "個", "本", "切れ"] },
  { item: "明太子", reading: "めんたいこ", answer: "腹", choices: ["腹", "本", "個", "切れ"] },
  // 連（れん・蓮根）
  { item: "蓮根", reading: "れんこん", answer: "連", choices: ["連", "本", "個", "節"] },
  // 手（て）
  { item: "将棋の手", reading: "しょうぎのて", answer: "手", choices: ["手", "局", "回", "番"] },
  // 番（つがい）
  { item: "鳥のつがい", reading: "とりのつがい", answer: "番", choices: ["番", "対", "組", "羽"] },
  // 玉（ぎょく・将棋）
  { item: "将棋の王", reading: "しょうぎのおう", answer: "玉", choices: ["玉", "枚", "個", "駒"] },
  // 駒（こま）
  { item: "チェスの駒", reading: "チェスのこま", answer: "駒", choices: ["駒", "個", "枚", "玉"] },
  { item: "将棋の駒", reading: "しょうぎのこま", answer: "駒", choices: ["駒", "枚", "個", "玉"] },
  // 口（くち・人数）
  { item: "保険", reading: "ほけん", answer: "口", choices: ["口", "件", "本", "個"] },
  // 棒（ぼう）
  { item: "アイスキャンディー", reading: "アイスキャンディー", answer: "本", choices: ["本", "棒", "個", "枚"] },
  // 管（かん）
  { item: "笛", reading: "ふえ", answer: "管", choices: ["管", "本", "個", "挺"] },
  { item: "注射器", reading: "ちゅうしゃき", answer: "管", choices: ["管", "本", "個", "挺"] },
  // 腰（こし）
  { item: "袴（腰）", reading: "はかま", answer: "腰", choices: ["腰", "着", "領", "枚"] },
  // 荷（か・に）
  { item: "荷物", reading: "にもつ", answer: "荷", choices: ["荷", "個", "箱", "袋"] },
  // 竿（さお）
  { item: "釣り竿", reading: "つりざお", answer: "竿", choices: ["竿", "本", "棹", "挺"] },
  { item: "物干し竿", reading: "ものほしざお", answer: "竿", choices: ["竿", "本", "棹", "挺"] },
  // 柱（はしら・電柱）
  { item: "電柱", reading: "でんちゅう", answer: "本", choices: ["本", "柱", "基", "個"] },
  // 座（ざ・劇団）
  { item: "劇場", reading: "げきじょう", answer: "座", choices: ["座", "軒", "館", "棟"] },
  // 帯（たい・おび）
  { item: "帯", reading: "おび", answer: "本", choices: ["本", "帯", "筋", "枚"] },
  // 流（りゅう）
  { item: "流派", reading: "りゅうは", answer: "流", choices: ["流", "派", "門", "家"] },
  // 派（は）
  { item: "政党の派閥", reading: "せいとうのはばつ", answer: "派", choices: ["派", "流", "党", "組"] },
  // 党（とう）
  { item: "政党", reading: "せいとう", answer: "党", choices: ["党", "派", "組", "団"] },
  // 宗（しゅう）
  { item: "宗派", reading: "しゅうは", answer: "宗", choices: ["宗", "派", "門", "流"] },
  // 門（もん・学問）
  { item: "学問の門", reading: "がくもんのもん", answer: "門", choices: ["門", "流", "派", "科"] },
  // 科（か）
  { item: "診療科", reading: "しんりょうか", answer: "科", choices: ["科", "室", "部", "課"] },
  { item: "学科", reading: "がっか", answer: "科", choices: ["科", "部", "課", "門"] },
  // 課（か）
  { item: "教科書の課", reading: "きょうかしょのか", answer: "課", choices: ["課", "章", "節", "編"] },
  // 項（こう）
  { item: "契約の項目", reading: "けいやくのこうもく", answer: "項", choices: ["項", "条", "節", "章"] },
  // 条（じょう・箇条）
  { item: "憲法の条文", reading: "けんぽうのじょうぶん", answer: "条", choices: ["条", "項", "章", "節"] },
  // 輿（こし）
  { item: "御輿", reading: "みこし", answer: "基", choices: ["基", "輿", "台", "本"] },
  // 差し（さし・傘）
  { item: "日傘", reading: "ひがさ", answer: "本", choices: ["本", "差し", "張", "個"] },
  // 遍（へん）
  { item: "お経を読む回数", reading: "おきょうをよむかいすう", answer: "遍", choices: ["遍", "回", "度", "編"] },
  // 禅（ぜん）
  { item: "座禅", reading: "ざぜん", answer: "禅", choices: ["禅", "回", "座", "度"] },
  // 葉（は）
  { item: "桜の葉", reading: "さくらのは", answer: "枚", choices: ["枚", "葉", "片", "本"] },
  // 片（へん・かた）
  { item: "花びら", reading: "はなびら", answer: "枚", choices: ["枚", "片", "輪", "個"] },
  // 輪（りん・花）
  { item: "薔薇", reading: "ばら", answer: "輪", choices: ["輪", "本", "枚", "株"] },
  { item: "菊", reading: "きく", answer: "輪", choices: ["輪", "本", "株", "枚"] },
  // 朶（だ）
  { item: "雲", reading: "くも", answer: "朶", choices: ["朶", "個", "片", "筋"] },
  // 座（ざ・仏像）
  { item: "仏像（座像）", reading: "ぶつぞう（ざぞう）", answer: "座", choices: ["座", "体", "尊", "基"] },
  // 壺（つぼ）
  { item: "骨壺", reading: "こつつぼ", answer: "壺", choices: ["壺", "個", "基", "本"] },
  { item: "花瓶（壺型）", reading: "かびんつぼがた", answer: "壺", choices: ["壺", "個", "本", "対"] },
  // 瓶（びん）
  { item: "ワインボトル", reading: "ワインボトル", answer: "本", choices: ["本", "瓶", "個", "杯"] },
  { item: "醤油瓶", reading: "しょうゆびん", answer: "本", choices: ["本", "瓶", "個", "缶"] },
  // 桶（おけ）
  { item: "風呂桶", reading: "ふろおけ", answer: "桶", choices: ["桶", "個", "杯", "樽"] },
  { item: "寿司桶", reading: "すしおけ", answer: "桶", choices: ["桶", "個", "膳", "台"] },
  // 床（しょう・とこ）
  { item: "床の間", reading: "とこのま", answer: "床", choices: ["床", "間", "室", "面"] },
  { item: "病院のベッド", reading: "びょういんのベッド", answer: "床", choices: ["床", "台", "個", "基"] },
  // 卓（たく）
  { item: "卓球台", reading: "たっきゅうだい", answer: "卓", choices: ["卓", "台", "面", "基"] },
  { item: "ビリヤード台", reading: "ビリヤードだい", answer: "卓", choices: ["卓", "台", "面", "基"] },
  // 秒（びょう）
  { item: "時間（秒）", reading: "じかんびょう", answer: "秒", choices: ["秒", "分", "度", "点"] },
  // 分（ふん・ぶ）
  { item: "時間（分）", reading: "じかんふん", answer: "分", choices: ["分", "秒", "時", "度"] },
  // 時（じ）
  { item: "時刻", reading: "じこく", answer: "時", choices: ["時", "分", "回", "度"] },
  // 日（にち・か）
  { item: "日数", reading: "にっすう", answer: "日", choices: ["日", "泊", "回", "度"] },
  // 週（しゅう）
  { item: "週間", reading: "しゅうかん", answer: "週", choices: ["週", "日", "月", "年"] },
  // 月（つき・げつ）
  { item: "月数", reading: "げっすう", answer: "月", choices: ["月", "週", "年", "日"] },
  { item: "ヶ月", reading: "かげつ", answer: "月", choices: ["月", "週", "年", "日"] },
  // 年（ねん）
  { item: "年数", reading: "ねんすう", answer: "年", choices: ["年", "月", "世紀", "代"] },
  // 国（こく・くに）
  { item: "国", reading: "くに", answer: "国", choices: ["国", "県", "州", "邦"] },
  { item: "参加国", reading: "さんかこく", answer: "国", choices: ["国", "州", "県", "邦"] },
  // 県（けん）
  { item: "都道府県", reading: "とどうふけん", answer: "県", choices: ["県", "国", "州", "市"] },
  // 市（し）
  { item: "政令指定都市", reading: "せいれいしていとし", answer: "市", choices: ["市", "県", "区", "町"] },
  // 町（ちょう・まち）
  { item: "町村", reading: "ちょうそん", answer: "町", choices: ["町", "村", "市", "区"] },
  // 村（そん・むら）
  { item: "村落", reading: "そんらく", answer: "村", choices: ["村", "町", "市", "区"] },
  // 区（く）
  { item: "特別区", reading: "とくべつく", answer: "区", choices: ["区", "市", "町", "県"] },
  // 丁（ちょう・住所）
  { item: "住所の丁目", reading: "じゅうしょのちょうめ", answer: "丁", choices: ["丁", "番", "号", "区"] },
  // 番（ばん・住所）
  { item: "住所の番地", reading: "じゅうしょのばんち", answer: "番", choices: ["番", "丁", "号", "区"] },
  // 着（ちゃく・順位）
  { item: "競馬の順位", reading: "けいばのじゅんい", answer: "着", choices: ["着", "位", "番", "等"] },
  { item: "マラソンの順位", reading: "マラソンのじゅんい", answer: "着", choices: ["着", "位", "番", "等"] },
  // セット（スポーツ）
  { item: "テニスのセット", reading: "テニスのセット", answer: "セット", choices: ["セット", "ゲーム", "回", "戦"] },
  { item: "バレーのセット", reading: "バレーのセット", answer: "セット", choices: ["セット", "回", "戦", "点"] },
  // ゲーム（スポーツ）
  { item: "テニスのゲーム", reading: "テニスのゲーム", answer: "ゲーム", choices: ["ゲーム", "セット", "回", "点"] },
  // ポイント（得点）
  { item: "得点", reading: "とくてん", answer: "点", choices: ["点", "ポイント", "個", "回"] },
  // ラウンド（ボクシング）
  { item: "ボクシング", reading: "ボクシング", answer: "ラウンド", choices: ["ラウンド", "回", "戦", "番"] },
  // イニング（野球）
  { item: "野球の回", reading: "やきゅうのかい", answer: "回", choices: ["回", "イニング", "戦", "番"] },
  // 拍（はく）
  { item: "リズムの拍", reading: "リズムのはく", answer: "拍", choices: ["拍", "回", "度", "節"] },
  { item: "心拍", reading: "しんぱく", answer: "拍", choices: ["拍", "回", "度", "分"] },
  // 節（せつ・音楽）
  { item: "楽譜の小節", reading: "がくふのしょうせつ", answer: "節", choices: ["節", "拍", "曲", "章"] },
  // 章（しょう・音楽）
  { item: "交響曲の楽章", reading: "こうきょうきょくのがくしょう", answer: "章", choices: ["章", "曲", "節", "編"] },
  // 本（ほん・映画）
  { item: "映画", reading: "えいが", answer: "本", choices: ["本", "作", "編", "話"] },
  // 作（さく）
  { item: "小説", reading: "しょうせつ", answer: "作", choices: ["作", "冊", "編", "本"] },
  // 番組（ばんぐみ）
  { item: "テレビ番組", reading: "テレビばんぐみ", answer: "本", choices: ["本", "番組", "回", "話"] },
  // コマ（漫画）
  { item: "漫画のコマ", reading: "まんがのコマ", answer: "コマ", choices: ["コマ", "枚", "個", "頁"] },
  // 箇所（かしょ）
  { item: "場所", reading: "ばしょ", answer: "箇所", choices: ["箇所", "個", "点", "件"] },
  { item: "修正箇所", reading: "しゅうせいかしょ", answer: "箇所", choices: ["箇所", "件", "個", "点"] },
  // 弦（げん）
  { item: "ギターの弦", reading: "ギターのげん", answer: "弦", choices: ["弦", "本", "筋", "条"] },
  { item: "バイオリンの弦", reading: "バイオリンのげん", answer: "弦", choices: ["弦", "本", "筋", "条"] },
  // 孔（あな・こう）
  { item: "穴", reading: "あな", answer: "孔", choices: ["孔", "個", "口", "穴"] },
  // 通（とおり）
  { item: "道", reading: "みち", answer: "通", choices: ["通", "本", "筋", "条"] },
  { item: "方法", reading: "ほうほう", answer: "通", choices: ["通", "種", "個", "件"] },
  // 様（よう）
  { item: "やり方", reading: "やりかた", answer: "様", choices: ["様", "通", "種", "個"] },
  // 家（け・か）
  { item: "家族", reading: "かぞく", answer: "家", choices: ["家", "世帯", "戸", "軒"] },
  { item: "名家", reading: "めいか", answer: "家", choices: ["家", "軒", "世帯", "門"] },
  // 氏（し）
  { item: "氏族", reading: "しぞく", answer: "氏", choices: ["氏", "家", "族", "門"] },
  // 藩（はん）
  { item: "藩（江戸時代）", reading: "はんえどじだい", answer: "藩", choices: ["藩", "国", "領", "州"] },
  // 領（りょう）
  { item: "領地", reading: "りょうち", answer: "領", choices: ["領", "藩", "国", "州"] },
  // 州（しゅう）
  { item: "アメリカの州", reading: "アメリカのしゅう", answer: "州", choices: ["州", "県", "国", "領"] },
  // 郡（ぐん）
  { item: "郡部", reading: "ぐんぶ", answer: "郡", choices: ["郡", "県", "町", "村"] },
  // 港（こう）
  { item: "港", reading: "みなと", answer: "港", choices: ["港", "軒", "基", "箇所"] },
  // 駅（えき）
  { item: "電車の駅", reading: "でんしゃのえき", answer: "駅", choices: ["駅", "軒", "箇所", "停"] },
  // 停（てい）
  { item: "バス停", reading: "バスてい", answer: "停", choices: ["停", "駅", "箇所", "軒"] },
  // 線（せん）
  { item: "電車の路線", reading: "でんしゃのろせん", answer: "線", choices: ["線", "本", "筋", "条"] },
  // 系統（けいとう）
  { item: "バスの系統", reading: "バスのけいとう", answer: "系統", choices: ["系統", "線", "本", "便"] },
  // 便（びん）
  { item: "バス便", reading: "バスびん", answer: "便", choices: ["便", "本", "回", "台"] },
  // 航路（こうろ）
  { item: "船の航路", reading: "ふねのこうろ", answer: "航路", choices: ["航路", "便", "線", "隻"] },
  // 波（なみ）
  { item: "波", reading: "なみ", answer: "波", choices: ["波", "個", "筋", "本"] },
  // 塊（かたまり）
  { item: "氷の塊", reading: "こおりのかたまり", answer: "塊", choices: ["塊", "個", "粒", "切れ"] },
  { item: "土の塊", reading: "つちのかたまり", answer: "塊", choices: ["塊", "個", "粒", "山"] },
  // 山（やま）
  { item: "書類の山", reading: "しょるいのやま", answer: "山", choices: ["山", "束", "個", "部"] },
  // 盛り（もり）
  { item: "ご飯の盛り", reading: "ごはんのもり", answer: "盛り", choices: ["盛り", "杯", "膳", "皿"] },
  // 釜（かま）
  { item: "ご飯の釜", reading: "ごはんのかま", answer: "釜", choices: ["釜", "杯", "膳", "個"] },
  // 膳（ぜん・別用途）
  { item: "懐石料理", reading: "かいせきりょうり", answer: "献", choices: ["献", "膳", "皿", "品"] },
  // 客（きゃく）
  { item: "お客様", reading: "おきゃくさま", answer: "人", choices: ["人", "名", "客", "方"] },
  // 方（かた）
  { item: "ご来場の方", reading: "ごらいじょうのかた", answer: "名", choices: ["名", "方", "人", "客"] },
  // 員（いん）
  { item: "会社の社員", reading: "かいしゃのしゃいん", answer: "名", choices: ["名", "人", "員", "方"] },
  // 柄（え・がら）
  { item: "杓子の柄", reading: "しゃくしのえ", answer: "柄", choices: ["柄", "本", "個", "把"] },
  // 節（ふし・竹）
  { item: "竹の節", reading: "たけのふし", answer: "節", choices: ["節", "本", "個", "段"] },
  // 梱（こん）
  { item: "荷物の梱包", reading: "にもつのこんぽう", answer: "梱", choices: ["梱", "個", "箱", "荷"] },
  // 輿（こし・別用途）
  { item: "お神輿", reading: "おみこし", answer: "基", choices: ["基", "台", "輿", "本"] },
  // 緒（お）
  { item: "草履の緒", reading: "ぞうりのお", answer: "緒", choices: ["緒", "本", "筋", "組"] },
  // 襲（かさね）
  { item: "十二単", reading: "じゅうにひとえ", answer: "襲", choices: ["襲", "枚", "着", "重"] },
  // 揃（そろい・食器）
  { item: "食器セット", reading: "しょっきセット", answer: "揃", choices: ["揃", "組", "セット", "膳"] },
  // 貼（ちょう）
  { item: "湿布", reading: "しっぷ", answer: "枚", choices: ["枚", "貼", "個", "本"] },
  // 剤（ざい）
  { item: "座薬", reading: "ざやく", answer: "個", choices: ["個", "剤", "錠", "本"] },
  // 玉（たま・糸）
  { item: "毛糸玉", reading: "けいとだま", answer: "玉", choices: ["玉", "個", "巻", "束"] },
  // 撚り（より）
  { item: "糸の撚り", reading: "いとのより", answer: "撚り", choices: ["撚り", "本", "筋", "巻"] },
  // かせ（綛）
  { item: "糸のかせ", reading: "いとのかせ", answer: "かせ", choices: ["かせ", "巻", "束", "玉"] },
  // 締め（しめ）
  { item: "鰹節の締め", reading: "かつおぶしのしめ", answer: "締め", choices: ["締め", "本", "個", "節"] },
  // 棹（さお・羊羹）
  { item: "羊羹", reading: "ようかん", answer: "棹", choices: ["棹", "本", "個", "切れ"] },
  // 連（れん・数珠）
  { item: "数珠", reading: "じゅず", answer: "連", choices: ["連", "本", "輪", "個"] },
  // 腰（こし・刀）
  { item: "刀（腰に差す）", reading: "かたなこしにさす", answer: "腰", choices: ["腰", "振", "本", "口"] },
  // 口（くち・釜）
  { item: "茶釜", reading: "ちゃがま", answer: "口", choices: ["口", "個", "釜", "基"] },
  // 壁（かべ・困難）
  { item: "困難の壁", reading: "こんなんのかべ", answer: "つ", choices: ["つ", "個", "枚", "壁"] },
  // 山（やま・峠）
  { item: "峠", reading: "とうげ", answer: "つ", choices: ["つ", "座", "山", "個"] },
  // つ（一般）
  { item: "お願い事", reading: "おねがいごと", answer: "つ", choices: ["つ", "個", "件", "回"] },
  // 折（おり）
  { item: "折り紙", reading: "おりがみ", answer: "枚", choices: ["枚", "折", "個", "羽"] },
  // 畳（じょう・たたみ）
  { item: "部屋の広さ", reading: "へやのひろさ", answer: "畳", choices: ["畳", "坪", "間", "帖"] },
  // 間（けん・長さ）
  { item: "長さ（伝統単位）", reading: "ながさでんとうたんい", answer: "間", choices: ["間", "尺", "寸", "丈"] },
  // 丈（じょう）
  { item: "高さ（伝統単位）", reading: "たかさでんとうたんい", answer: "丈", choices: ["丈", "尺", "間", "寸"] },
  // 勺（しゃく）
  { item: "少量の酒", reading: "しょうりょうのさけ", answer: "勺", choices: ["勺", "合", "升", "杯"] },
  // 斗（と）
  { item: "大量の酒", reading: "たいりょうのさけ", answer: "斗", choices: ["斗", "升", "石", "合"] },
  // 貫（かんめ・重さ）
  { item: "重さ（伝統単位）", reading: "おもさでんとうたんい", answer: "貫", choices: ["貫", "斤", "両", "匁"] },
  // 匁（もんめ）
  { item: "真珠の重さ", reading: "しんじゅのおもさ", answer: "匁", choices: ["匁", "貫", "両", "分"] },
  // 厘（りん）
  { item: "打率", reading: "だりつ", answer: "厘", choices: ["厘", "分", "割", "毛"] },
  // 毛（もう）
  { item: "打率（細かい）", reading: "だりつこまかい", answer: "毛", choices: ["毛", "厘", "分", "割"] },
  // 分（ぶ・割合）
  { item: "確率", reading: "かくりつ", answer: "分", choices: ["分", "割", "厘", "％"] },
  // カラット
  { item: "ダイヤモンド", reading: "ダイヤモンド", answer: "カラット", choices: ["カラット", "粒", "個", "石"] },
  // 月（げつ・期間）
  { item: "期間（月）", reading: "きかんつき", answer: "月", choices: ["月", "週", "日", "年"] },
  // 年（ねん・期間）
  { item: "期間（年）", reading: "きかんねん", answer: "年", choices: ["年", "月", "期", "代"] },
  // 代（だい・料金）
  { item: "電話料金", reading: "でんわりょうきん", answer: "代", choices: ["代", "円", "回", "件"] },
  // 台（だい・広さ）
  { item: "駐車場の広さ", reading: "ちゅうしゃじょうのひろさ", answer: "台", choices: ["台", "個", "坪", "面"] },
  // 番（ばん・順番）
  { item: "順番", reading: "じゅんばん", answer: "番", choices: ["番", "位", "着", "等"] },
  // 膳（ぜん・寿司）
  { item: "回転寿司の皿", reading: "かいてんずしのさら", answer: "皿", choices: ["皿", "貫", "枚", "膳"] },
  // 周（しゅう）
  { item: "トラックの周回", reading: "トラックのしゅうかい", answer: "周", choices: ["周", "回", "圏", "輪"] },
  { item: "地球の周回", reading: "ちきゅうのしゅうかい", answer: "周", choices: ["周", "回", "圏", "輪"] },
  // 巡（じゅん）
  { item: "巡回", reading: "じゅんかい", answer: "巡", choices: ["巡", "回", "周", "度"] },
  // 廻り（まわり）
  { item: "見回り", reading: "みまわり", answer: "回", choices: ["回", "廻り", "周", "巡"] },
  // 版（はん）
  { item: "本の版", reading: "ほんのはん", answer: "版", choices: ["版", "刷", "冊", "部"] },
  { item: "ソフトウェアのバージョン", reading: "ソフトウェアのバージョン", answer: "版", choices: ["版", "号", "回", "世代"] },
  // 刷（さつ・すり）
  { item: "印刷の刷", reading: "いんさつのさつ", answer: "刷", choices: ["刷", "版", "部", "回"] },
  // 刊（かん）
  { item: "出版物", reading: "しゅっぱんぶつ", answer: "刊", choices: ["刊", "冊", "部", "号"] },
  // 誌（し）
  { item: "専門誌", reading: "せんもんし", answer: "誌", choices: ["誌", "冊", "部", "号"] },
  // 紙（し）
  { item: "新聞紙", reading: "しんぶんし", answer: "紙", choices: ["紙", "部", "枚", "面"] },
  // 面（めん・新聞）
  { item: "新聞の面", reading: "しんぶんのめん", answer: "面", choices: ["面", "頁", "枚", "部"] },
  // 欄（らん）
  { item: "表の欄", reading: "ひょうのらん", answer: "欄", choices: ["欄", "列", "行", "段"] },
  // 段（だん・段落）
  { item: "文章の段落", reading: "ぶんしょうのだんらく", answer: "段", choices: ["段", "節", "項", "章"] },
  // 韻（いん）
  { item: "詩の韻", reading: "しのいん", answer: "韻", choices: ["韻", "句", "節", "行"] },
  // 音（おん・おと）
  { item: "和音", reading: "わおん", answer: "音", choices: ["音", "拍", "調", "曲"] },
  // 声（こえ・せい）
  { item: "合唱の声部", reading: "がっしょうのせいぶ", answer: "声", choices: ["声", "部", "音", "調"] },
  // 調（ちょう）
  { item: "楽曲の調", reading: "がっきょくのちょう", answer: "調", choices: ["調", "曲", "音", "楽章"] },
  // 旋律（せんりつ）
  { item: "メロディー", reading: "メロディー", answer: "旋律", choices: ["旋律", "曲", "節", "調"] },
  // 穂（ほ）
  { item: "稲穂", reading: "いなほ", answer: "穂", choices: ["穂", "本", "株", "束"] },
  { item: "麦の穂", reading: "むぎのほ", answer: "穂", choices: ["穂", "本", "株", "粒"] },
  // 枝（えだ）
  { item: "木の枝", reading: "きのえだ", answer: "枝", choices: ["枝", "本", "株", "束"] },
  // 茎（くき）
  { item: "花の茎", reading: "はなのくき", answer: "茎", choices: ["茎", "本", "株", "枝"] },
  // 根（ね・こん）
  { item: "大根", reading: "だいこん", answer: "本", choices: ["本", "根", "個", "株"] },
  { item: "人参", reading: "にんじん", answer: "本", choices: ["本", "根", "個", "株"] },
  // 芽（め）
  { item: "新芽", reading: "しんめ", answer: "芽", choices: ["芽", "本", "株", "個"] },
  // 蕾（つぼみ）
  { item: "花の蕾", reading: "はなのつぼみ", answer: "蕾", choices: ["蕾", "輪", "個", "本"] },
  // 実（み）
  { item: "木の実", reading: "きのみ", answer: "粒", choices: ["粒", "個", "実", "本"] },
  // 環（かん・わ）
  { item: "鎖の環", reading: "くさりのかん", answer: "環", choices: ["環", "輪", "個", "本"] },
  // 珠（たま・しゅ）
  { item: "念珠の珠", reading: "ねんじゅのたま", answer: "珠", choices: ["珠", "粒", "個", "玉"] },
  // 粉（こな・ふん）
  { item: "薬の粉", reading: "くすりのこな", answer: "包", choices: ["包", "袋", "粉", "服"] },
  // 筒（つつ・とう）
  { item: "竹筒", reading: "たけづつ", answer: "筒", choices: ["筒", "本", "個", "管"] },
  { item: "望遠鏡", reading: "ぼうえんきょう", answer: "筒", choices: ["筒", "本", "台", "個"] },
  // 側（がわ・そく）
  { item: "川の両側", reading: "かわのりょうがわ", answer: "側", choices: ["側", "面", "方", "辺"] },
  // 辺（へん・あたり）
  { item: "三角形の辺", reading: "さんかっけいのへん", answer: "辺", choices: ["辺", "本", "面", "側"] },
  // 隅（すみ）
  { item: "部屋の隅", reading: "へやのすみ", answer: "隅", choices: ["隅", "角", "個", "箇所"] },
  // 角（かど・かく）
  { item: "四角形の角", reading: "しかっけいのかく", answer: "角", choices: ["角", "隅", "個", "辺"] },
  // 端（はし・たん）
  { item: "テーブルの端", reading: "テーブルのはし", answer: "端", choices: ["端", "側", "辺", "個"] },
  // 先（さき・せん）
  { item: "鉛筆の先", reading: "えんぴつのさき", answer: "先", choices: ["先", "本", "個", "端"] },
  // 元（もと・げん）
  { item: "出典の元", reading: "しゅってんのもと", answer: "元", choices: ["元", "個", "件", "箇所"] },
  // 脈（みゃく）
  { item: "山脈", reading: "さんみゃく", answer: "脈", choices: ["脈", "本", "筋", "条"] },
  // 通（つう・道）
  { item: "選択肢の道", reading: "せんたくしのみち", answer: "通", choices: ["通", "道", "本", "筋"] },
  // 路（じ・ろ）
  { item: "帰り道", reading: "かえりみち", answer: "路", choices: ["路", "本", "筋", "通"] },
  // 径（けい）
  { item: "小道", reading: "こみち", answer: "筋", choices: ["筋", "本", "条", "径"] },
  // 圏（けん）
  { item: "経済圏", reading: "けいざいけん", answer: "圏", choices: ["圏", "個", "域", "区"] },
  // 域（いき）
  { item: "地域", reading: "ちいき", answer: "域", choices: ["域", "圏", "区", "個"] },
  // 界（かい）
  { item: "業界", reading: "ぎょうかい", answer: "界", choices: ["界", "業", "圏", "域"] },
  // 順（じゅん）
  { item: "手順", reading: "てじゅん", answer: "順", choices: ["順", "段", "回", "番"] },
  // 序（じょ）
  { item: "序列", reading: "じょれつ", answer: "序", choices: ["序", "順", "位", "番"] },
  // 則（そく）
  { item: "規則", reading: "きそく", answer: "則", choices: ["則", "条", "項", "法"] },
  // 規（き）
  { item: "社内規定", reading: "しゃないきてい", answer: "規", choices: ["規", "則", "条", "項"] },
  // 法（ほう）
  { item: "法律（条文）", reading: "ほうりつじょうぶん", answer: "法", choices: ["法", "条", "則", "項"] },
  // 令（れい）
  { item: "政令", reading: "せいれい", answer: "令", choices: ["令", "法", "条", "則"] },
  // 策（さく）
  { item: "対策", reading: "たいさく", answer: "策", choices: ["策", "案", "件", "個"] },
  // 計（けい）
  { item: "計画", reading: "けいかく", answer: "計", choices: ["計", "案", "件", "個"] },
  // 画（かく・が）
  { item: "企画", reading: "きかく", answer: "画", choices: ["画", "案", "件", "本"] },
  // 形（かた・けい）
  { item: "形態", reading: "けいたい", answer: "形", choices: ["形", "型", "種", "様"] },
  // 型（かた・けい）
  { item: "血液型", reading: "けつえきがた", answer: "型", choices: ["型", "種", "形", "類"] },
  // 類（るい）
  { item: "種類（分類）", reading: "しゅるいぶんるい", answer: "類", choices: ["類", "種", "型", "品"] },
  // 風（ふう）
  { item: "和風", reading: "わふう", answer: "風", choices: ["風", "式", "様", "流"] },
  // 系（けい）
  { item: "系統", reading: "けいとう", answer: "系", choices: ["系", "流", "派", "統"] },
  // 統（とう）
  { item: "血統", reading: "けっとう", answer: "統", choices: ["統", "系", "流", "脈"] },
  // 星（ほし・せい）
  { item: "星", reading: "ほし", answer: "星", choices: ["星", "個", "点", "つ"] },
  // 星（せい・惑星）
  { item: "惑星", reading: "わくせい", answer: "星", choices: ["星", "個", "つ", "体"] },
  // 銀河（ぎんが）
  { item: "銀河", reading: "ぎんが", answer: "銀河", choices: ["銀河", "個", "つ", "星"] },
  // 色（いろ・しょく）
  { item: "色", reading: "いろ", answer: "色", choices: ["色", "種", "つ", "個"] },
  // 柄（がら）
  { item: "模様の柄", reading: "もようのがら", answer: "柄", choices: ["柄", "種", "個", "枚"] },
  // 様（よう・模様）
  { item: "デザインの模様", reading: "デザインのもよう", answer: "様", choices: ["様", "柄", "種", "個"] },
  // 事（こと・じ）
  { item: "出来事", reading: "できごと", answer: "件", choices: ["件", "事", "個", "つ"] },
  // 物（もの・ぶつ）
  { item: "落とし物", reading: "おとしもの", answer: "点", choices: ["点", "個", "物", "件"] },
  // 件（けん・別用途）
  { item: "訴訟", reading: "そしょう", answer: "件", choices: ["件", "訴", "個", "回"] },
  // 傷（きず）
  { item: "傷", reading: "きず", answer: "傷", choices: ["傷", "個", "箇所", "つ"] },
  // 痕（あと・こん）
  { item: "傷痕", reading: "きずあと", answer: "痕", choices: ["痕", "個", "箇所", "傷"] },
  // 跡（あと・せき）
  { item: "足跡", reading: "あしあと", answer: "跡", choices: ["跡", "個", "箇所", "歩"] },
  // 印（しるし・いん）
  { item: "目印", reading: "めじるし", answer: "印", choices: ["印", "個", "つ", "箇所"] },
  // 札（ふだ・さつ）
  { item: "お札", reading: "おさつ", answer: "枚", choices: ["枚", "札", "個", "本"] },
  // 紙幣（しへい）
  { item: "紙幣", reading: "しへい", answer: "枚", choices: ["枚", "札", "個", "本"] },
  // 硬貨（こうか）
  { item: "硬貨", reading: "こうか", answer: "枚", choices: ["枚", "個", "円", "玉"] },
  // 円（えん）
  { item: "金額", reading: "きんがく", answer: "円", choices: ["円", "個", "枚", "点"] },
  // ドル
  { item: "ドル紙幣", reading: "ドルしへい", answer: "ドル", choices: ["ドル", "枚", "個", "札"] },
  // ユーロ
  { item: "ユーロ", reading: "ユーロ", answer: "ユーロ", choices: ["ユーロ", "枚", "個", "円"] },
  // 握り（にぎり）
  { item: "おにぎり", reading: "おにぎり", answer: "個", choices: ["個", "握り", "つ", "膳"] },
  // 掴み（つかみ）
  { item: "一掴みの砂", reading: "ひとつかみのすな", answer: "掴み", choices: ["掴み", "握り", "個", "杯"] },
  // 摘み（つまみ）
  { item: "塩一摘み", reading: "しおひとつまみ", answer: "摘み", choices: ["摘み", "匙", "粒", "個"] },
  // 振（ふり）
  { item: "塩を振る", reading: "しおをふる", answer: "振", choices: ["振", "回", "度", "匙"] },
  // 掛け（かけ）
  { item: "賭けの掛け金", reading: "かけのかけきん", answer: "掛け", choices: ["掛け", "回", "口", "件"] },
  // 賭け（かけ）
  { item: "賭け", reading: "かけ", answer: "賭け", choices: ["賭け", "回", "件", "口"] },
  // 投げ（なげ）
  { item: "投球", reading: "とうきゅう", answer: "球", choices: ["球", "投げ", "回", "本"] },
  // 球（きゅう・たま）
  { item: "野球のボール", reading: "やきゅうのボール", answer: "球", choices: ["球", "個", "本", "投"] },
  // 投（とう）
  { item: "投票数", reading: "とうひょうすう", answer: "票", choices: ["票", "投", "回", "件"] },
  // 打（だ）
  { item: "野球の打数", reading: "やきゅうのだすう", answer: "打", choices: ["打", "回", "本", "球"] },
  // 打（だ・安打）
  { item: "ヒット", reading: "ヒット", answer: "打", choices: ["打", "本", "回", "球"] },
  // 本塁打（ほんるいだ）
  { item: "ホームラン", reading: "ホームラン", answer: "本", choices: ["本", "本塁打", "打", "回"] },
  // 点（てん・打点）
  { item: "打点", reading: "だてん", answer: "点", choices: ["点", "打", "回", "本"] },
  // 塁（るい・盗塁）
  { item: "盗塁", reading: "とうるい", answer: "塁", choices: ["塁", "回", "個", "打"] },
  // 塁（るい）
  { item: "塁", reading: "るい", answer: "塁", choices: ["塁", "個", "回", "打"] },
  // 振（しん・三振）
  { item: "三振", reading: "さんしん", answer: "振", choices: ["振", "回", "個", "打"] },
  // 球（きゅう・四球）
  { item: "フォアボール", reading: "フォアボール", answer: "球", choices: ["球", "回", "個", "打"] },
  // ゴール
  { item: "サッカーのゴール", reading: "サッカーのゴール", answer: "ゴール", choices: ["ゴール", "点", "回", "本"] },
  // アシスト
  { item: "アシスト", reading: "アシスト", answer: "アシスト", choices: ["アシスト", "回", "本", "点"] },
  // シュート
  { item: "シュート", reading: "シュート", answer: "本", choices: ["本", "シュート", "回", "発"] },
  // パス
  { item: "パス", reading: "パス", answer: "本", choices: ["本", "パス", "回", "個"] },
  // タッチダウン
  { item: "タッチダウン", reading: "タッチダウン", answer: "タッチダウン", choices: ["タッチダウン", "点", "回", "本"] },
  // エース
  { item: "テニスのエース", reading: "テニスのエース", answer: "本", choices: ["本", "エース", "回", "点"] },
  // ダブルフォルト
  { item: "ダブルフォルト", reading: "ダブルフォルト", answer: "回", choices: ["回", "本", "個", "点"] },
  // フォルト
  { item: "サーブのフォルト", reading: "サーブのフォルト", answer: "回", choices: ["回", "本", "個", "フォルト"] },
  // KO（ノックアウト）
  { item: "ノックアウト", reading: "ノックアウト", answer: "KO", choices: ["KO", "回", "勝", "戦"] },
  // TKO
  { item: "テクニカルノックアウト", reading: "テクニカルノックアウト", answer: "TKO", choices: ["TKO", "KO", "回", "勝"] },
  // メダル
  { item: "オリンピックのメダル", reading: "オリンピックのメダル", answer: "個", choices: ["個", "枚", "メダル", "つ"] },
  // 金（きん）
  { item: "金メダル", reading: "きんメダル", answer: "個", choices: ["個", "枚", "金", "つ"] },
  // トロフィー
  { item: "トロフィー", reading: "トロフィー", answer: "個", choices: ["個", "本", "つ", "基"] },
  // 賞状（しょうじょう）
  { item: "賞状", reading: "しょうじょう", answer: "枚", choices: ["枚", "通", "個", "本"] },
  // 免許（めんきょ）
  { item: "運転免許", reading: "うんてんめんきょ", answer: "枚", choices: ["枚", "個", "通", "本"] },
  // 資格（しかく）
  { item: "資格", reading: "しかく", answer: "個", choices: ["個", "つ", "件", "種"] },
  // 学位（がくい）
  { item: "学位", reading: "がくい", answer: "個", choices: ["個", "つ", "号", "学位"] },
  // 特許（とっきょ）
  { item: "特許", reading: "とっきょ", answer: "件", choices: ["件", "個", "本", "特許"] },
  // 発明（はつめい）
  { item: "発明", reading: "はつめい", answer: "件", choices: ["件", "個", "つ", "発明"] },
  // 発見（はっけん）
  { item: "発見", reading: "はっけん", answer: "件", choices: ["件", "個", "つ", "発見"] },
  // 件（けん・記録）
  { item: "記録", reading: "きろく", answer: "件", choices: ["件", "個", "つ", "回"] },
  // 件（けん・目標）
  { item: "目標", reading: "もくひょう", answer: "件", choices: ["件", "個", "つ", "回"] },
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

  const isCorrectAnswer = (choice, answer) => {
    if (Array.isArray(answer)) {
      return answer.includes(choice);
    }
    return choice === answer;
  };

  const handleAnswer = (choice) => {
    if (showResult) return;

    setSelectedAnswer(choice);
    setShowResult(true);

    const isCorrect = isCorrectAnswer(choice, questions[currentQuestion].answer);
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
            const isCorrect = isCorrectAnswer(choice, question.answer);

            if (showResult) {
              if (isCorrect) {
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
                isCorrectAnswer(selectedAnswer, question.answer)
                  ? styles.correctFeedback
                  : styles.wrongFeedback,
              ]}
            >
              <Text style={styles.feedbackEmoji}>
                {isCorrectAnswer(selectedAnswer, question.answer) ? "⭕" : "❌"}
              </Text>
              <Text style={styles.feedbackText}>
                {isCorrectAnswer(selectedAnswer, question.answer)
                  ? "正解！"
                  : `残念... 正解は「${Array.isArray(question.answer) ? question.answer.join("」か「") : question.answer}」`}
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
