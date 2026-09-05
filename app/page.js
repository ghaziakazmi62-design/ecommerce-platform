import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SuccessContent />
    </Suspense>
  );
}