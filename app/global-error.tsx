"use client";

export default function GlobalError({error,reset}:{error:Error & {digest?:string};reset:()=>void}){
  return <html lang="en"><body><main className="system-state-page system-state-standalone" data-error-digest={error.digest||undefined}>
    <p className="section-index">RBA / TEMPORARY ERROR</p>
    <h1>We could not load this page.</h1>
    <p>Please retry once. If the problem continues, return to the RBA home page or contact us.</p>
    <div className="system-state-actions">
      <button className="button button-dark" type="button" onClick={()=>reset()}>Try again</button>
      <a className="button button-light" href="/">RBA home</a>
      <a className="text-link" href="/contact">Contact RBA</a>
    </div>
  </main></body></html>;
}
