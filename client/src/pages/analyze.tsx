import { SermonForm } from "@/components/sermons/SermonForm";
import { AuthCheck } from "@/components/auth/AuthCheck";

export default function Analyze() {
  return (
    <AuthCheck>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold">Analyze Your Sermon</h1>
        <SermonForm />
      </div>
    </AuthCheck>
  );
}
