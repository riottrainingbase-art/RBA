import {SiteFrame} from "@/components/site-frame";
import styles from "@/components/united-miyagi.module.css";

export default function Page(){return <SiteFrame locale="ja"><div className={styles.page}><section className={styles.section}><h1>お支払い手続きありがとうございます</h1><p>Stripeで入金が確認でき次第、正式受付となります。決済処理中の場合は少しお待ちください。</p><p>決済控えをご確認ください。メールが届かなくても、二重決済はせず <a href="mailto:riot.training.base@gmail.com">RBA</a> へお問い合わせください。</p></section></div></SiteFrame>;}
