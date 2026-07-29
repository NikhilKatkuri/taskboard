import { Task } from "@/models/Task";
import "dotenv/config";
import mongoose from "mongoose";
 
const ownerArg = process.argv.find((a) => a.startsWith("--owner="));
const owner = ownerArg?.split("=")[1];

if (!owner) {
  console.error("Missing --owner=OBJECT_ID");
  process.exit(1);
}

const ownerId = new mongoose.Types.ObjectId(owner);

const titles = [
  "Update authentication middleware",
  "Fix mobile navigation bug",
  "Refactor task service",
  "Write unit tests for API",
  "Improve dashboard performance",
  "Add forgot password flow",
  "Review pull request #42",
  "Create onboarding screen",
  "Optimize MongoDB indexes",
  "Implement dark mode",
  "Fix form validation errors",
  "Add task filtering feature",
  "Update project documentation",
  "Integrate email notifications",
  "Clean up unused components",
  "Add loading skeletons",
  "Improve accessibility labels",
  "Set up GitHub Actions CI",
  "Test Android production build",
  "Prepare release notes",
];

const priorities = ["Low", "Medium", "High"] as const;
const statuses = ["todo", "in-progress", "review", "done"] as const;
const tagsPool = ["backend", "frontend", "mobile", "api", "ui", "testing", "performance"];

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function randomTags() {
  return tagsPool.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
}

function futureDate() {
  const min = Date.now() + 60_000; // at least 1 minute ahead
  const max = Date.now() + 1000 * 60 * 60 * 24 * 30; // within 30 days
  return new Date(min + Math.random() * (max - min));
}

async function seed() {
  console.log({
    db: process.env["MONGODB_URI"],
    owner,
  });

  if (!process.env["MONGODB_URI"]) {
    throw new Error("MONGODB_URI is undefined. Check your .env file.");
  }

  await mongoose.connect(process.env["MONGODB_URI"]);

  const count = Math.floor(Math.random() * 11) + 10; // 10-20

  const tasks = Array.from({ length: count }, (_, i) => ({
    title: titles[i % titles.length],
    description: `Seeded task ${i + 1}`,
    priority: randomItem(priorities),
    status: randomItem(statuses),
    dueAt: futureDate(),
    tags: randomTags(),
    owner: ownerId,
  }));

  const inserted = await Task.insertMany(tasks);

  console.log(`Inserted ${inserted.length} tasks`);

  await mongoose.disconnect();
}

seed().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});