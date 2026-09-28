import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DemoProvider } from "@/lib/arguss/store";
import { AppShell } from "@/components/arguss/AppShell";

export const Route = createFileRoute("/_shell")({
  component: ShellLayout,
});

function ShellLayout() {
  return (
    <DemoProvider>
      <AppShell>
        <Outlet />
      </AppShell>
    </DemoProvider>
  );
}
