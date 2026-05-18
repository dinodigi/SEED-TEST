import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <Badge>Foundation</Badge>
      <Card className="mt-4 p-6">
        <h1 className="text-2xl font-semibold">LexCore AI</h1>
        <p className="mt-2 text-slate-600">Dashboard shell ready for milestone M1.</p>
        <Button className="mt-6">Create Matter</Button>
      </Card>
    </main>
  );
}
