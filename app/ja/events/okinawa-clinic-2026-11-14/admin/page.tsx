import type { Metadata } from "next";
import { OkinawaClinicAdmin } from "@/components/okinawa-clinic-admin";
import styles from "@/components/okinawa-clinic.module.css";
export const metadata:Metadata={title:"沖縄クリニック運営｜RBA",robots:{index:false,follow:false}};
export default function Page(){return <main className={styles.section}><p>RBA / 運営専用</p><h1>11/14 沖縄クリニック</h1><p>個人情報を含みます。会場案内・当日運営に必要な担当者のみが取り扱い、名簿を一般公開しないでください。</p><OkinawaClinicAdmin/><p><a href="/ja/events/okinawa-clinic-2026-11-14">公式申込ページへ戻る</a></p></main>;}
