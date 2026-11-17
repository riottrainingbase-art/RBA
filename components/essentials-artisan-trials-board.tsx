import { saveRbaArtisanTrial } from "@/app/ja/essentials/manage/atelier/actions";
import styles from "./essentials-artisan-trials-board.module.css";

export type ArtisanTrial={
 id:string;label:string;garment:"white_tee"|"black_hoodie";finish:"signature_lettering"|"artist_one_of_one";
 stage:string;notes:string;sample_count:number;wash_cycles:number;paint_method_tested:boolean;
 rights_approved:boolean;creator_compensation_agreed:boolean;sample_quality_approved:boolean;
 label_care_approved:boolean;fulfillment_confirmed:boolean;quoted_artist_fee_jpy:number|null;
 estimated_minutes:number|null;planned_addon_jpy:number|null;updated_at:string;
};
const checks=[
 ["rights_approved","作者と商用利用許諾を文書で確認"],
 ["creator_compensation_agreed","作家報酬・制作費を書面で合意"],
 ["paint_method_tested","生地・インクの適合性を実物で確認"],
 ["sample_quality_approved","現物サンプルの品質を承認"],
 ["label_care_approved","品質表示・洗濯表示を検証"],
 ["fulfillment_confirmed","制作能力・納期・不良時の対応を確認"],
] as const;
const stages=[
 ["design","企画・原価検討"],["quote_requested","見積依頼中"],
 ["sample_in_progress","試作中"],["sample_received","現物受領"],
 ["revisions_needed","再調整"],["approved_for_internal_review","内部最終審査対象"],["paused","保留"],
] as const;
function TrialForm({t}:{t?:ArtisanTrial}){
 return <form className={styles.form} action={saveRbaArtisanTrial}>
  <input type="hidden" name="id" value={t?.id??""}/>
  <div className={styles.fields}>
   <label>試作案件名<input name="label" minLength={3} maxLength={100} required defaultValue={t?.label??""} placeholder="例：白T / 筆文字 / 試作01"/></label>
   <label>進捗<select name="stage" defaultValue={t?.stage??"design"}>{stages.map(([v,n])=><option value={v} key={v}>{n}</option>)}</select></label>
   <label>商品<select name="garment" defaultValue={t?.garment??"white_tee"}><option value="white_tee">ホワイトTシャツ</option><option value="black_hoodie">ブラックパーカー</option></select></label>
   <label>作品仕様<select name="finish" defaultValue={t?.finish??"signature_lettering"}><option value="signature_lettering">短文手書き</option><option value="artist_one_of_one">一点ものアート</option></select></label>
   <label>現物サンプルの確認数<input type="number" name="sample_count" min={0} max={100} required defaultValue={t?.sample_count??0}/></label>
   <label>記録した洗濯試験回数<input type="number" name="wash_cycles" min={0} max={100} required defaultValue={t?.wash_cycles??0}/></label>
   <label>作家報酬の見積（円）<input type="number" name="quoted_artist_fee_jpy" min={0} max={1000000} defaultValue={t?.quoted_artist_fee_jpy??""} placeholder="未見積なら空欄"/></label>
   <label>加工時間の見積（分）<input type="number" name="estimated_minutes" min={1} max={1000} defaultValue={t?.estimated_minutes??""} placeholder="未測定なら空欄"/></label>
   <label>検討する追加料金（税込・円）<input type="number" name="planned_addon_jpy" min={100} max={200000} step={100} defaultValue={t?.planned_addon_jpy??""} placeholder="未承認価格"/></label>
  </div>
  <fieldset className={styles.checklist}><legend>QUALITY / RIGHTS / OPERATIONS</legend>
   {checks.map(([key,label])=><label key={key}><input type="checkbox" name={key} defaultChecked={!!t?.[key]}/>{label}</label>)}
  </fieldset>
  <label className={styles.notes}>試作品の状態・課題・記録（購入者の個人情報は入力しない）
   <textarea rows={3} maxLength={2000} name="notes" defaultValue={t?.notes??""}/>
  </label>
  <p className={styles.help}>「内部最終審査対象」にはサンプル1着以上・洗濯試験10回以上・必要な許諾、報酬、品質、納期確認が必要です。ここで記録を承認しても、Stripe決済や商品タグは有効になりません。</p>
  <button type="submit" className={styles.save}>{t?"記録を更新する":"案件を登録する"} <span aria-hidden="true">↗</span></button>
 </form>;
}
export function ArtisanTrialsBoard({trials,status,auditCount}:{trials:ArtisanTrial[];status?:string;auditCount:number}){
 return <section className={styles.shell} aria-label="手書きオプション開発台帳">
  <div className={styles.head}><p className={styles.micro}>RBA / PRIVATE DEVELOPMENT</p>
   <h2>The Studio Log.</h2>
   <p>制作・品質・権利の証拠をひとつの試作案件ごとに記録。販売中の商品ではありません。</p>
   <p className={styles.micro}>{trials.length} TRIALS / {auditCount} HISTORY ENTRIES</p>
   {status==="saved"&&<p role="status" className={styles.success}>記録を保存し、変更履歴を残しました。</p>}
   {(status==="invalid"||status==="storage_error")&&<p role="alert" className={styles.alert}>{status==="invalid"?"入力内容・承認に必要な条件を確認してください。":"保存できません。データベース設定を確認してください。"}</p>}
  </div>
  <details className={styles.panel}><summary>＋ 新しい試作案件を登録</summary><TrialForm/></details>
  {trials.length===0&&<p className={styles.empty}>試作記録はまだありません。案件を登録するとここに表示されます。</p>}
  {trials.map(t=><details className={styles.panel} key={t.id}>
    <summary><span><small>{t.garment==="white_tee"?"WHITE TEE":"BLACK HOODIE"} / {t.finish==="signature_lettering"?"SIGNATURE":"ARTIST"}</small><strong>{t.label}</strong><small>{stages.find(([s])=>s===t.stage)?.[1]??t.stage}</small></span><span>EDIT ↗</span></summary>
    <p className={styles.micro}>最終更新：{new Date(t.updated_at).toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"})}</p>
    <TrialForm t={t}/>
  </details>)}
  <p className={styles.help}>変更履歴は監査用に保存されます。作家の実名・契約書・購入者の個人情報は、このメモ欄ではなく権限のある別の保管先で管理してください。</p>
 </section>;
}
