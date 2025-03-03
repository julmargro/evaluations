"use client";
import { useSearchParams } from "next/navigation";
import Home from "./components/Home";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  return <Home currentUserId={userId} />;
}
