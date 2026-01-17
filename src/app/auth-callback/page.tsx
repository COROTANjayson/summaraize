import { Suspense } from "react";

import AuthCallbackClient, { LoadingFallback } from "./AuthCallbackClient";

const Page = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthCallbackClient />
    </Suspense>
  );
};

export default Page;
