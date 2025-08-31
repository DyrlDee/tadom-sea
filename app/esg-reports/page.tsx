"use client"
import { DashboardHeader } from "./dashboard-header";
import { QuickActions } from "./quick-actions";
import { MetricsOverview } from "./metrics-overview";
import { ESGTable } from "./esg-table";
import { DataVisualizations } from "./data-visualizations";
import { ReportGenerator } from "./report-generator";
import { UserProfile } from "./user-profile";

export default function EsgReportsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        <QuickActions />
        <section id="metrics-overview">
          <MetricsOverview />
        </section>
        <section id="data-visualizations">
          <DataVisualizations />
        </section>
        <section id="esg-table">
          <ESGTable />
        </section>
        <section id="report-generator">
          <ReportGenerator />
        </section>
      </main>
    </div>
  );
}
