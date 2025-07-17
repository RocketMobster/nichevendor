"use client";
import { usePathname } from "next/navigation";
import Breadcrumbs from "../common/Breadcrumbs";

export default function ClientBreadcrumbs() {
  const pathname = usePathname();
  // Hide breadcrumbs on Add Product page (with or without trailing slash)
  if (pathname === "/products/add" || pathname === "/products/add/") return null;
  return <Breadcrumbs />;
}
