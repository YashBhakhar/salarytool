import { render, screen }
from "@testing-library/react";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import AnalyticsPage
from "../modules/analytics/pages/analytics-page";

const queryClient = new QueryClient();

describe("Analytics Page", () => {
  it("renders analytics loading state", () => {
    render(
      <QueryClientProvider
        client={queryClient}
      >
        <AnalyticsPage />
      </QueryClientProvider>
    );

    expect(
      screen.getByText(
        "Loading analytics..."
      )
    ).toBeDefined();
  });
});