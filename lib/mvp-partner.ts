export const mvpRoomPath = "/my-homecourt/app/mvp";
export const mvpLoginPath = `/my-homecourt/login?next=${encodeURIComponent(mvpRoomPath)}&role=coach&source=mvp-partnership`;
export const mvpPillars = [
  { title: "Player development", text: "Build age-appropriate progressions, movement skills and decisions that transfer to games." },
  { title: "Coach education", text: "Connect original references with simple practice ideas, reflection and coach-to-coach discussion." },
  { title: "Programme planning", text: "Bring a session plan, explain the challenge and review what changed on court." },
  { title: "Japan–Malaysia exchange", text: "Share perspectives across coaching environments and explore future learning opportunities together." },
];
export const mvpDiscussionKinds = { question: "Coaching question", practice: "Practice reflection", idea: "Idea exchange" } as const;
export type MvpMember = { user_id: string; display_name: string; member_role: "manager" | "coach"; status: "pending" | "active" | "declined" };
export type MvpThread = { id: string; user_id: string; title: string; body: string; kind: keyof typeof mvpDiscussionKinds; topic: string; age_group: string; status: "open" | "resolved"; created_at: string };
export type MvpReply = { id: string; thread_id: string; user_id: string; body: string; created_at: string };
