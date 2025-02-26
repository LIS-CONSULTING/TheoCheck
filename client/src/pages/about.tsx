import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">About Sermon GPT</h1>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground">
            Sermon GPT leverages artificial intelligence to help preachers enhance
            their sermon delivery and impact. We believe in combining modern
            technology with timeless truth to serve the church more effectively.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">How It Works</h2>
          <p className="text-muted-foreground">
            Our AI-powered platform analyzes your sermons across multiple
            dimensions including structure, theological clarity, practical
            relevance, and engagement. You receive detailed feedback and
            actionable suggestions to improve your preaching.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">Privacy & Security</h2>
          <p className="text-muted-foreground">
            We take the privacy of your sermon content seriously. All submissions
            are encrypted and processed securely. Your content is never shared or
            used for purposes other than analysis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
