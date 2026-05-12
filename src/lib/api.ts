import type { MealEntry } from "./storage";

export async function fetchMealData(): Promise<MealEntry[]> {
  const res = await fetch("/api/meal-data");
  if (!res.ok) throw new Error(`Failed to fetch meal data: ${res.status}`);
  return res.json() as Promise<MealEntry[]>;
}

export async function saveMealData(entries: MealEntry[]): Promise<void> {
  const res = await fetch("/api/meal-data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entries),
  });
  if (!res.ok) throw new Error(`Failed to save meal data: ${res.status}`);
}
