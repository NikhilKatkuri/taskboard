import type { taskData } from "@schemas/task/Task";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTNlODUwMjY4NjZiMjhiOGZjNzFhZTYiLCJpYXQiOjE3NjU3MDQ5NjIsImV4cCI6MTc2NjMwOTc2Mn0.ItjbcsUuLbIydlr56HWZWHSG2LVBjkY3k3aXh8EgKaU";
const API_BASE = "http://localhost:5000/api/tasks/create";

const mockTasks = [
  {
    title: "Task 1: Plan Documentation",
    description:
      "Optimize database queries for better performance. High impact.",
    dueAt: "2026-05-21T00:00:00Z",
    priority: "High" as const,
    status: "done" as const,
    tags: ["Design", "Work", "Personal", "Meeting"],
  },
  {
    title: "Task 2: Test Database",
    description: "Prepare quarterly report. Coordinate with team.",
    dueAt: "2026-03-07T10:15:00Z",
    priority: "Low" as const,
    status: "in-progress" as const,
    tags: ["Meeting"],
  },
  {
    title: "Task 3: Implement Feature",
    description:
      "Update the documentation for the latest release. Coordinate with team.",
    dueAt: "2026-01-02T01:30:00Z",
    priority: "Low" as const,
    status: "todo" as const,
    tags: ["Research"],
  },
  {
    title: "Task 4: Deploy Feature",
    description: "Design the new dashboard layout. High impact.",
    dueAt: "2026-02-11T22:30:00Z",
    priority: "High" as const,
    status: "in-progress" as const,
    tags: ["Planning", "Personal", "Research"],
  },
  {
    title: "Task 5: Research API",
    description: "Prepare quarterly report. High impact.",
    dueAt: "2026-03-10T10:00:00Z",
    priority: "Low" as const,
    status: "in-progress" as const,
    tags: ["Planning", "Work", "Review", "Bug"],
  },
  {
    title: "Task 6: Fix Presentation",
    description:
      "Write unit tests for the payment module. Coordinate with team.",
    dueAt: "2026-04-18T15:15:00Z",
    priority: "Low" as const,
    status: "done" as const,
    tags: ["Meeting", "Feature"],
  },
  {
    title: "Task 7: Test Bug",
    description: "Resolve the login issue reported by users. ASAP",
    dueAt: "2026-01-16T17:00:00Z",
    priority: "High" as const,
    status: "todo" as const,
    tags: ["Planning", "Review", "Personal", "Bug"],
  },
  {
    title: "Task 8: Test Feature",
    description: "Complete the new user onboarding flow. ASAP",
    dueAt: "2026-02-17T03:45:00Z",
    priority: "Low" as const,
    status: "in-progress" as const,
    tags: ["Research"],
  },
  {
    title: "Task 9: Test Documentation",
    description: "Design the new dashboard layout. Details in attached notes.",
    dueAt: "2026-01-19T15:15:00Z",
    priority: "Medium" as const,
    status: "done" as const,
    tags: ["Personal"],
  },
  {
    title: "Task 10: Research Bug",
    description: "Resolve the login issue reported by users. High impact.",
    dueAt: "2025-12-29T05:45:00Z",
    priority: "High" as const,
    status: "in-progress" as const,
    tags: ["Research", "Urgent", "Work", "Meeting"],
  },
  {
    title: "Task 11: Migrate Legacy System",
    description:
      "Coordinate with infrastructure team to migrate old CRM to new cloud platform. Prepare rollback plan.",
    dueAt: "2026-01-15T18:00:00Z",
    priority: "High" as const,
    status: "in-progress" as const,
    tags: ["Infrastructure", "Migration", "Critical"],
  },
  {
    title: "Task 12: Conduct Security Audit",
    description:
      "Perform quarterly penetration testing and vulnerability scan on production servers.",
    dueAt: "2026-01-08T17:00:00Z",
    priority: "High" as const,
    status: "todo" as const,
    tags: ["Security", "Compliance", "Audit"],
  },
  {
    title: "Task 13: Prepare Customer Demo",
    description:
      "Build customized demo for key client showcasing new analytics dashboard features.",
    dueAt: "2025-12-20T14:00:00Z",
    priority: "High" as const,
    status: "in-progress" as const,
    tags: ["Sales", "Demo", "Client"],
  },
  {
    title: "Task 14: Update API Documentation",
    description:
      "Revise public API docs to reflect v2.1 changes and add new endpoint examples.",
    dueAt: "2026-01-05T23:59:00Z",
    priority: "Medium" as const,
    status: "todo" as const,
    tags: ["Documentation", "API", "Developer"],
  },
  {
    title: "Task 15: Onboard New Team Member",
    description:
      "Set up accounts, schedule training sessions, and assign mentor for new backend engineer.",
    dueAt: "2025-12-23T17:00:00Z",
    priority: "Medium" as const,
    status: "done" as const,
    tags: ["HR", "Onboarding", "Team"],
  },
  {
    title: "Task 16: Optimize Frontend Bundle",
    description:
      "Reduce main bundle size by 30% through code splitting and lazy loading.",
    dueAt: "2026-02-01T12:00:00Z",
    priority: "Medium" as const,
    status: "in-progress" as const,
    tags: ["Performance", "Frontend", "Optimization"],
  },
  {
    title: "Task 17: Plan Q1 Roadmap",
    description:
      "Facilitate workshop with product and engineering to finalize Q1 2026 priorities.",
    dueAt: "2025-12-19T16:00:00Z",
    priority: "High" as const,
    status: "todo" as const,
    tags: ["Planning", "Roadmap", "Strategy"],
  },
  {
    title: "Task 18: Fix Payment Gateway Integration",
    description:
      "Resolve intermittent failures in Stripe webhook processing during high traffic.",
    dueAt: "2025-12-18T23:59:00Z",
    priority: "High" as const,
    status: "in-progress" as const,
    tags: ["Bug", "Payment", "Urgent"],
  },
  {
    title: "Task 19: Analyze User Feedback",
    description:
      "Compile and categorize feedback from last month's NPS survey for product improvements.",
    dueAt: "2026-01-10T15:00:00Z",
    priority: "Low" as const,
    status: "todo" as const,
    tags: ["Analytics", "UX", "Research"],
  },
  {
    title: "Task 20: Schedule Team Retrospective",
    description:
      "Organize end-of-year retrospective meeting and prepare agenda and facilitation materials.",
    dueAt: "2025-12-30T11:00:00Z",
    priority: "Medium" as const,
    status: "done" as const,
    tags: ["Team", "Retrospective", "Process"],
  },
  {
    title: "Task 21: Implement Dark Mode",
    description:
      "Add full dark mode support across the web application using CSS variables and user preference detection.",
    dueAt: "2026-01-20T17:00:00Z",
    priority: "Medium" as const,
    status: "in-progress" as const,
    tags: ["UI", "Frontend", "Feature"],
  },
  {
    title: "Task 22: Set Up CI/CD Pipeline",
    description:
      "Configure GitHub Actions for automated testing, building, and deployment to staging environment.",
    dueAt: "2026-01-12T23:59:00Z",
    priority: "High" as const,
    status: "todo" as const,
    tags: ["DevOps", "Automation", "Infrastructure"],
  },
  {
    title: "Task 23: Write Integration Tests",
    description:
      "Add end-to-end tests for the new checkout flow using Cypress.",
    dueAt: "2026-01-25T18:00:00Z",
    priority: "Medium" as const,
    status: "in-progress" as const,
    tags: ["Testing", "QA", "E2E"],
  },
  {
    title: "Task 24: Refactor Authentication Service",
    description:
      "Migrate from token-based auth to OAuth 2.0 with refresh tokens for improved security.",
    dueAt: "2026-02-10T12:00:00Z",
    priority: "High" as const,
    status: "todo" as const,
    tags: ["Backend", "Security", "Refactor"],
  },
  {
    title: "Task 25: Design Marketing Landing Page",
    description:
      "Create high-converting landing page mockups for upcoming product launch campaign.",
    dueAt: "2025-12-24T17:00:00Z",
    priority: "High" as const,
    status: "in-progress" as const,
    tags: ["Design", "Marketing", "Campaign"],
  },
  {
    title: "Task 26: Monitor Production Metrics",
    description:
      "Set up alerts for key performance indicators and review weekly health reports.",
    dueAt: "2026-01-05T10:00:00Z",
    priority: "Low" as const,
    status: "done" as const,
    tags: ["Monitoring", "SRE", "Operations"],
  },
  {
    title: "Task 27: Prepare Budget Forecast",
    description:
      "Compile Q1 2026 department budget including headcount and tool subscriptions.",
    dueAt: "2025-12-31T18:00:00Z",
    priority: "High" as const,
    status: "todo" as const,
    tags: ["Finance", "Planning", "Budget"],
  },
  {
    title: "Task 28: Localize Mobile App",
    description:
      "Add Spanish and French translations for all user-facing strings in the iOS and Android apps.",
    dueAt: "2026-02-15T23:59:00Z",
    priority: "Medium" as const,
    status: "in-progress" as const,
    tags: ["Mobile", "Internationalization", "Localization"],
  },
  {
    title: "Task 29: Conduct User Interviews",
    description:
      "Schedule and run 10 user interviews to validate new search feature assumptions.",
    dueAt: "2026-01-18T16:00:00Z",
    priority: "Medium" as const,
    status: "todo" as const,
    tags: ["Research", "UX", "Interviews"],
  },
  {
    title: "Task 30: Upgrade Database Schema",
    description:
      "Plan and execute schema migration for adding multi-tenancy support with zero downtime.",
    dueAt: "2026-01-30T20:00:00Z",
    priority: "High" as const,
    status: "in-progress" as const,
    tags: ["Database", "Backend", "Migration"],
  },
  {
    title: "Task 31: Implement Rate Limiting",
    description:
      "Add robust API rate limiting with Redis to prevent abuse and DoS attacks.",
    dueAt: "2026-01-08T23:59:00Z",
    priority: "High" as const,
    status: "in-progress" as const,
    tags: ["Security", "Backend", "Performance"],
  },
  {
    title: "Task 32: Create Annual Report Design",
    description:
      "Design visually appealing 2025 annual report for stakeholders and investors.",
    dueAt: "2025-12-28T18:00:00Z",
    priority: "High" as const,
    status: "todo" as const,
    tags: ["Design", "Branding", "Corporate"],
  },
  {
    title: "Task 33: Migrate Emails to New Provider",
    description:
      "Transition all company emails from GSuite to Microsoft 365 with zero downtime.",
    dueAt: "2026-01-20T20:00:00Z",
    priority: "High" as const,
    status: "todo" as const,
    tags: ["IT", "Migration", "Admin"],
  },
  {
    title: "Task 34: Add GraphQL Endpoint",
    description:
      "Expose a new GraphQL API alongside REST for flexible frontend queries.",
    dueAt: "2026-02-05T17:00:00Z",
    priority: "Medium" as const,
    status: "in-progress" as const,
    tags: ["API", "Backend", "GraphQL"],
  },
  {
    title: "Task 35: Run Accessibility Audit",
    description:
      "Conduct full WCAG 2.2 AA audit and fix critical accessibility issues.",
    dueAt: "2026-01-15T23:59:00Z",
    priority: "High" as const,
    status: "todo" as const,
    tags: ["A11y", "UX", "Compliance"],
  },
  {
    title: "Task 36: Automate Invoice Generation",
    description:
      "Build automated PDF invoice generator triggered on subscription renewal.",
    dueAt: "2026-01-10T15:00:00Z",
    priority: "Medium" as const,
    status: "done" as const,
    tags: ["Automation", "Billing", "Backend"],
  },
  {
    title: "Task 37: Organize Tech Talk Series",
    description:
      "Plan and schedule internal tech talk series for Q1 2026 with external speakers.",
    dueAt: "2025-12-30T17:00:00Z",
    priority: "Low" as const,
    status: "in-progress" as const,
    tags: ["Community", "Learning", "Events"],
  },
  {
    title: "Task 38: Implement WebSockets Chat",
    description:
      "Add real-time chat functionality using Socket.io for customer support agents.",
    dueAt: "2026-02-20T20:00:00Z",
    priority: "Medium" as const,
    status: "todo" as const,
    tags: ["Realtime", "Frontend", "Support"],
  },
  {
    title: "Task 39: Archive Old Projects",
    description:
      "Clean up and archive all completed client projects older than 3 years from storage.",
    dueAt: "2026-01-31T18:00:00Z",
    priority: "Low" as const,
    status: "in-progress" as const,
    tags: ["Maintenance", "Cleanup", "Storage"],
  },
  {
    title: "Task 40: Launch Referral Program",
    description:
      "Design and launch customer referral program with tracking and reward system.",
    dueAt: "2025-12-25T23:59:00Z",
    priority: "High" as const,
    status: "todo" as const,
    tags: ["Growth", "Marketing", "Product"],
  },
];

export const seedTasks = async () => {
  console.log("🌱 Starting to seed tasks...");

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < mockTasks.length; i++) {
    const task = mockTasks[i];

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        successCount++;
        console.log(
          `✅ Created task ${i + 1}/${mockTasks.length}: ${task.title}`
        );
      } else {
        errorCount++;
        const error = await response.json();
        console.error(
          `❌ Failed task ${i + 1}/${mockTasks.length}: ${task.title}`,
          error
        );
      }
    } catch (error) {
      errorCount++;
      console.error(
        `❌ Error creating task ${i + 1}/${mockTasks.length}: ${task.title}`,
        error
      );
    }

    // Small delay to avoid overwhelming the server
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log("\n🎉 Seeding completed!");
  console.log(`✅ Success: ${successCount} tasks`);
  console.log(`❌ Failed: ${errorCount} tasks`);
};

// Run if this file is executed directly
if (typeof window !== "undefined") {
  console.log("To seed tasks, run: seedTasks()");
}
