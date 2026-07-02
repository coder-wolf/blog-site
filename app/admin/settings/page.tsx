export default function SettingsPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-light text-[#1a1a1a] mb-1">Settings</h1>
        <p className="text-sm text-[#666]">Manage your blog configuration</p>
      </div>

      <div className="space-y-12">
        <section>
          <div className="pb-4 border-b border-[#e5e5e5] mb-8">
            <h2 className="text-sm font-medium tracking-[0.15em] uppercase text-[#1a1a1a]">
              General
            </h2>
          </div>
          <div className="max-w-lg space-y-6">
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-2">
                Blog Title
              </label>
              <input
                type="text"
                defaultValue="The Journal"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-2">
                Tagline
              </label>
              <input
                type="text"
                defaultValue="Thoughts, tutorials, and stories about building with Next.js."
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="pb-4 border-b border-[#e5e5e5] mb-8">
            <h2 className="text-sm font-medium tracking-[0.15em] uppercase text-[#1a1a1a]">
              SEO
            </h2>
          </div>
          <div className="max-w-lg space-y-6">
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-2">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                defaultValue="A personal blog about web development, Next.js, and modern JavaScript."
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-2">
                Google Analytics ID
              </label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb] font-mono"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="pb-4 border-b border-[#e5e5e5] mb-8">
            <h2 className="text-sm font-medium tracking-[0.15em] uppercase text-[#1a1a1a]">
              Social Links
            </h2>
          </div>
          <div className="max-w-lg space-y-6">
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-2">
                Twitter / X
              </label>
              <input
                type="text"
                placeholder="https://x.com/username"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-2">
                GitHub
              </label>
              <input
                type="text"
                placeholder="https://github.com/username"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="pb-4 border-b border-[#e5e5e5] mb-8">
            <h2 className="text-sm font-medium tracking-[0.15em] uppercase text-[#999]">
              Danger Zone
            </h2>
          </div>
          <button className="text-sm tracking-[0.15em] uppercase text-[#cc3333] border border-[#cc3333] px-6 py-3 hover:bg-[#cc3333] hover:text-white transition-colors">
            Delete All Posts
          </button>
        </section>

        <div className="pt-4">
          <button className="text-sm tracking-[0.15em] uppercase text-white bg-[#1a1a1a] px-8 py-3 hover:bg-[#333] transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
