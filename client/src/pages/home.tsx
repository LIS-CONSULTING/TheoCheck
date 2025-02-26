import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Improve Your Sermons with AI
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Submit your sermon and receive detailed analysis, personalized feedback,
          and actionable insights to enhance your preaching.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/analyze">
            <Button size="lg">Analyze a Sermon</Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-32 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="text-center">
          <h3 className="mt-6 text-lg font-semibold">Detailed Analysis</h3>
          <p className="mt-2 text-muted-foreground">
            Get comprehensive feedback on structure, theology, relevance, and engagement
          </p>
        </div>
        <div className="text-center">
          <h3 className="mt-6 text-lg font-semibold">Visual Insights</h3>
          <p className="mt-2 text-muted-foreground">
            Interactive charts and graphs to visualize your strengths and areas for growth
          </p>
        </div>
        <div className="text-center">
          <h3 className="mt-6 text-lg font-semibold">Actionable Feedback</h3>
          <p className="mt-2 text-muted-foreground">
            Receive specific suggestions to improve your preaching effectiveness
          </p>
        </div>
      </div>
    </div>
  );
}
