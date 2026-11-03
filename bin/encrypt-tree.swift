// 家族版加密：讀 assets/js/aodi/tree.private.json（明文，gitignore），
// 產生 (1) tree.public.js：只到第 4 代有名字、之後只有人數（公開）
//     (2) tree.enc.json：整份私密資料的密文（公開；沒密碼就是亂碼）
// 密碼從環境變數 AODI_PW 讀（bin/encrypt-tree 用 read -s 從鍵盤拿，不落地）。
// 演算法：PBKDF2-HMAC-SHA256（600,000 次）→ AES-256-GCM。瀏覽器用 WebCrypto 解。
import Foundation
import CryptoKit
import CommonCrypto

let PUBLIC_GENS = 4          // 公開版保留到第幾代
let ITER: UInt32 = 600_000

let root = URL(fileURLWithPath: CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : ".")
let dir = root.appendingPathComponent("assets/js/aodi")
let privURL = dir.appendingPathComponent("tree.private.json")
guard let privData = try? Data(contentsOf: privURL) else { fputs("找不到 \(privURL.path)\n", stderr); exit(1) }
guard let priv = try? JSONSerialization.jsonObject(with: privData) as? [String: Any], let tree = priv["tree"] as? [String: Any] else { fputs("tree.private.json 不是合法 JSON\n", stderr); exit(1) }
guard let pw0 = ProcessInfo.processInfo.environment["AODI_PW"], pw0.count >= 12 else { fputs("AODI_PW 沒設或太短（至少 12 字）\n", stderr); exit(1) }
// 密碼正規化（跟瀏覽器端一樣）：NFC、去頭尾空白、半形 , . 轉全形 ，。
let pw = pw0.precomposedStringWithCanonicalMapping.trimmingCharacters(in: .whitespacesAndNewlines).replacingOccurrences(of: ",", with: "，").replacingOccurrences(of: ".", with: "。")

// ---- 公開版：剪到第 PUBLIC_GENS 代，往下只留人數 ----
func countDesc(_ n: [String: Any]) -> (Int, Int) { // (人數, 最深代數相對 n)
  var total = 0, depth = 0
  for k in (n["kids"] as? [[String: Any]] ?? []) { let (c, d) = countDesc(k); total += 1 + c; depth = max(depth, 1 + d) }
  return (total, depth)
}
func prune(_ n: [String: Any], gen: Int) -> [String: Any] {
  var o: [String: Any] = ["name": n["name"] ?? ""]
  if let sp = n["spouse"] { o["spouse"] = sp }
  if let nt = n["note"] as? String, !nt.contains("小水滴") { o["note"] = nt }
  let kids = n["kids"] as? [[String: Any]] ?? []
  if kids.isEmpty { return o }
  if gen < PUBLIC_GENS { o["kids"] = kids.map { prune($0, gen: gen + 1) }; return o }
  let (c, d) = countDesc(n)
  o["below"] = "往下 \(c) 人・到第 \(gen + d) 代（家族版才看得到名字）"
  return o
}
let pub = prune(tree, gen: 1)
let (allN, allD) = countDesc(tree)
let pubJSON = try! JSONSerialization.data(withJSONObject: pub, options: [.withoutEscapingSlashes])
var pubJS = "// 公開版族譜：由 bin/encrypt-tree 產生，只到第 \(PUBLIC_GENS) 代有名字（都是 1900 年以前出生、已過世的祖先），之後只有人數。\n"
pubJS += "// 完整版在 tree.enc.json（加密），按頁面上的「🔑 家族版」輸入密碼解開。\n"
pubJS += "export const TREE = " + String(data: pubJSON, encoding: .utf8)! + ";\n"
pubJS += "export const ME = null;\n"
pubJS += "export const TOTAL = { people: \(allN + 1), gens: \(allD + 1) };\n"
try! pubJS.write(to: dir.appendingPathComponent("tree.public.js"), atomically: true, encoding: .utf8)

// ---- 加密整份私密 JSON ----
var salt = [UInt8](repeating: 0, count: 16); _ = SecRandomCopyBytes(kSecRandomDefault, 16, &salt)
var key = [UInt8](repeating: 0, count: 32)
let pwBytes = Array(pw.utf8)
let rc = CCKeyDerivationPBKDF(CCPBKDFAlgorithm(kCCPBKDF2), pw, pwBytes.count, salt, salt.count, CCPseudoRandomAlgorithm(kCCPRFHmacAlgSHA256), ITER, &key, 32)
guard rc == kCCSuccess else { fputs("PBKDF2 失敗\n", stderr); exit(1) }
let plain = try! JSONSerialization.data(withJSONObject: priv, options: [.withoutEscapingSlashes])
let nonce = AES.GCM.Nonce()
let sealed = try! AES.GCM.seal(plain, using: SymmetricKey(data: key), nonce: nonce)
let out: [String: Any] = [
  "v": 1, "kdf": "PBKDF2-SHA256", "iter": ITER, "cipher": "AES-256-GCM",
  "salt": Data(salt).base64EncodedString(), "iv": Data(nonce).base64EncodedString(),
  "ct": (sealed.ciphertext + sealed.tag).base64EncodedString(),
]
let encData = try! JSONSerialization.data(withJSONObject: out, options: [.sortedKeys])
try! encData.write(to: dir.appendingPathComponent("tree.enc.json"))
print("✓ tree.public.js：第 1–\(PUBLIC_GENS) 代有名字；全族 \(allN + 1) 人、\(allD + 1) 代")
print("✓ tree.enc.json：\(encData.count) bytes 密文（PBKDF2 ×\(ITER) → AES-256-GCM）")
