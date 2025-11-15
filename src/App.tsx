import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Code, 
  Palette, 
  Rocket, 
  Github, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vite Starter
            </span>
          </div>
          <a
            href="https://github.com/moinulmoin/vite-react-tailwind-starter"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 mb-4">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Modern React Starter Template
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Build Fast.
            </span>
            <br />
            <span className="text-slate-900 dark:text-slate-100">
              Ship Faster.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A beautiful starter template with Vite, React, TypeScript, Tailwind CSS, and Shadcn UI. 
            Get started in seconds, not minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="group text-lg px-8 py-6">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
              asChild
            >
              <a
                href="https://github.com/moinulmoin/vite-react-tailwind-starter"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Everything you need to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> start building</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Pre-configured with the best tools and practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Lightning Fast
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Powered by Vite for instant hot module replacement and blazing fast builds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Type Safe
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Full TypeScript support with strict type checking for better developer experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-300 dark:hover:border-pink-700 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Beautiful UI
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Shadcn UI components with Tailwind CSS for stunning, accessible interfaces.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Production Ready
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Optimized build configuration ready for deployment to any platform.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Best Practices
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                ESLint, Prettier, and modern React patterns included out of the box.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-300 dark:hover:border-pink-700 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Modern Stack
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Latest versions of React, Vite, and all dependencies for cutting-edge development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready to build something amazing?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Clone the repository and start building your next project in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-blue-50"
                  asChild
                >
                  <a
                    href="https://github.com/moinulmoin/vite-react-tailwind-starter"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    Star on GitHub
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Built with Vite + React + Tailwind
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
              <a 
                href="https://github.com/moinulmoin/vite-react-tailwind-starter" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
              <span>•</span>
              <span>MIT License</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
