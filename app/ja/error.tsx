"use client";

export default function Error({reset}:{error:Error & {digest?:string};reset:()=>void}){
  return <main className="system-state-page system-state-standalone">
    <p className="section-index">RBA / TEMPORARY ERROR</p>
    <h1>ページを表示できませんでした。</h1>
    <p>一時的な通信・表示エラーの可能性があります。入力内容や決済を再実行する前に、画面を再読み込みしてください。同じ状態が続く場合はお問い合わせください。</p>
    <div className="system-state-actions">
      <button className="button button-dark" type="button" onClick={()=>reset()}>もう一度読み込む</button>
      <a className="button button-light" href="/ja">RBAトップへ</a>
      <a className="text-link" href="/ja/contact">お問い合わせ</a>
    </div>
  </main>;
}
