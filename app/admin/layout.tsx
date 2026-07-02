import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-[1120px] mx-auto px-6">
        <header className="py-6 border-b border-[#e5e5e5]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-sm font-medium tracking-[0.2em] uppercase text-[#1a1a1a]">
                Admin
              </Link>
              <span className="text-[11px] text-[#ccc] font-mono">Dashboard</span>
            </div>
            <nav className="flex gap-6">
              <Link
                href="/admin"
                className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
              >
                Posts
              </Link>
              <Link
                href="/admin/write"
                className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
              >
                Write
              </Link>
              <Link
                href="/admin/settings"
                className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
              >
                Settings
              </Link>
              <span className="w-px bg-[#e5e5e5]" />
              <Link
                href="/"
                className="text-sm text-[#999] hover:text-[#1a1a1a] transition-colors"
              >
                View Site
              </Link>
              <span className="w-px bg-[#e5e5e5]" />
              <LogoutButton />
            </nav>
          </div>
        </header>

        <main className="py-10">{children}</main>
      </div>
    </div>
  );
}
