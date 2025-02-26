import { SermonHistory } from "@/components/sermons/SermonHistory";
import { AuthCheck } from "@/components/auth/AuthCheck";

export default function History() {
  return (
    <AuthCheck>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold">Sermon History</h1>
        <SermonHistory />
      </div>
    </AuthCheck>
  );
}
