export default function WritePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-light text-[#1a1a1a] mb-1">Write</h1>
          <p className="text-sm text-[#666]">Draft a new article</p>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            form="editor-form"
            className="text-sm tracking-[0.15em] uppercase text-[#999] px-6 py-3 border border-[#e5e5e5] hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
          >
            Save Draft
          </button>
          <button
            type="submit"
            form="editor-form"
            className="text-sm tracking-[0.15em] uppercase text-white bg-[#1a1a1a] px-6 py-3 hover:bg-[#333] transition-colors"
          >
            Publish
          </button>
        </div>
      </div>

      <form id="editor-form" className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <input
                type="text"
                placeholder="Article title"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-2xl font-light text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Slug (e.g. my-article-title)"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#666] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb] font-mono"
              />
            </div>
            <div>
              <textarea
                rows={3}
                placeholder="Short excerpt for the article card..."
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#666] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none placeholder:text-[#bbb]"
              />
            </div>
            <div>
              <textarea
                rows={16}
                placeholder="Write your article content here..."
                className="w-full px-0 py-3 text-[15px] leading-[1.9] text-[#1a1a1a] bg-transparent border-b border-[#e5e5e5] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none placeholder:text-[#bbb]"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-3">
                Cover Image
              </label>
              <div className="h-40 bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] flex items-center justify-center cursor-pointer hover:from-[#e8e8e8] hover:to-[#d8d8d8] transition-colors">
                <span className="text-[11px] tracking-[0.1em] uppercase text-[#ccc]">
                  Click to upload
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-3">
                Author
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-3">
                Tags
              </label>
              <input
                type="text"
                placeholder="Next.js, Web Dev, Tutorial"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-3">
                Publish Date
              </label>
              <input
                type="date"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
