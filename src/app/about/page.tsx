import PageWrapper from "@/components/custom/PageWrapper"
import { Github, Heart, Users, TrendingUp, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Fraunces, Space_Grotesk } from "next/font/google"

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
})

const About = () => {
  return (
    <PageWrapper>
      <div className={`${spaceGrotesk.variable} ${fraunces.variable}`} style={{ fontFamily: "var(--font-body)" }}>
        <div className="min-h-screen from-stone-50 text-slate-100">
          <section className="relative overflow-hidden">
            <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28">
              <div className="grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
                <div className="animate-fade-up" style={{ animationDelay: "50ms" }}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-black shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    Built for real training
                  </div>
                  <h1
                    style={{ fontFamily: "var(--font-display)" }}
                    className="mt-6 text-4xl font-semibold leading-tight text-slate-50 md:text-6xl"
                  >
                    About Trainer App
                  </h1>
                  <p className="mt-6 max-w-xl text-lg text-slate-200 md:text-xl">
                    A focused companion for muscle growth, strength gains, and clear weekly training plans.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button size="lg" className="bg-slate-900 text-white border border-slate-300 hover:bg-slate-800" asChild>
                      <a href="/exercises">Browse exercises</a>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-slate-300 text-slate-700 hover:bg-white"
                      asChild
                    >
                      <a href="/profile/registration">Create profile</a>
                    </Button>
                  </div>
                </div>
                <Card
                  className="animate-fade-up border border-white/60 bg-slate-300 shadow-2xl backdrop-blur"
                  style={{ animationDelay: "140ms" }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Focus</p>
                        <p className="text-2xl font-semibold text-slate-900">Muscle growth</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                        <Target className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-8 grid gap-4">
                      <div className="rounded-2xl border border-3 border-slate-900 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-900">Progress snapshots</p>
                        <p className="mt-1 text-sm text-slate-900/70">
                          Keep volume, intensity, and recovery in view.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-3 border-slate-900 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-900">Training clarity</p>
                        <p className="mt-1 text-sm text-slate-900/70">
                          See what to train next without the noise.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-3 border-slate-900 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-900">Visual muscle maps</p>
                        <p className="mt-1 text-sm text-slate-600">
                          Tables, charts, and anatomy views in one place.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 py-16">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl animate-fade-up" style={{ animationDelay: "120ms" }}>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Core features</p>
                <h2
                  style={{ fontFamily: "var(--font-display)" }}
                  className="mt-3 text-3xl font-semibold text-slate-50 md:text-4xl"
                >
                  Train with intent, not guesswork.
                </h2>
              </div>
              <p
                className="max-w-md text-slate-200 animate-fade-up"
                style={{ animationDelay: "180ms" }}
              >
                Every screen keeps you focused on progression, balance, and smarter programming.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card
                className="group animate-fade-up border border-white/60 bg-slate-300 shadow-lg backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ animationDelay: "220ms" }}
              >
                <CardContent className="p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">Progress tracking</h3>
                  <p className="mt-3 text-slate-600">
                    Stay accountable with session history, volume trends, and clear recovery cues.
                  </p>
                </CardContent>
              </Card>
              <Card
                className="group animate-fade-up border border-white/60 bg-slate-300 shadow-lg backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ animationDelay: "280ms" }}
              >
                <CardContent className="p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">Custom programs</h3>
                  <p className="mt-3 text-slate-600">
                    Build routines that match your goals, time, and training experience.
                  </p>
                </CardContent>
              </Card>
              <Card
                className="group animate-fade-up border border-white/60 bg-slate-300 shadow-lg backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ animationDelay: "340ms" }}
              >
                <CardContent className="p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">Visual learning</h3>
                  <p className="mt-3 text-slate-600">
                    Choose tables, charts, or anatomy views that explain each muscle group fast.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 pb-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr,0.95fr]">
              <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-300">What you get</p>
                <h2
                  style={{ fontFamily: "var(--font-display)" }}
                  className="mt-3 text-3xl font-semibold text-slate-50 md:text-4xl"
                >
                  A clear path from goal to daily action.
                </h2>
                <p className="mt-4 text-lg text-slate-200">
                  The app helps you plan ahead, train with purpose, and understand what each session is doing for you.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-300 p-4">
                    <p className="text-sm font-semibold text-slate-900">Personalized programs</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Adjust volume and focus based on your goals.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-300 p-4">
                    <p className="text-sm font-semibold text-slate-900">Muscle visualization</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Understand what is trained and what needs attention.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-300 p-4">
                    <p className="text-sm font-semibold text-slate-900">Progress analytics</p>
                    <p className="mt-2 text-sm text-slate-600">
                      See performance changes across weeks.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-300 p-4">
                    <p className="text-sm font-semibold text-slate-900">Evidence-based cues</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Practical guidance based on training science.
                    </p>
                  </div>
                </div>
              </div>
              <Card
                className="animate-fade-up border border-emerald-100 bg-slate-300 shadow-xl backdrop-blur"
                style={{ animationDelay: "200ms" }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Training loop</p>
                      <p className="text-xl font-semibold text-slate-900">Plan. Train. Review.</p>
                    </div>
                  </div>
                  <div className="mt-6 ml-2 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                        1
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Set your weekly focus</p>
                        <p className="text-sm text-slate-600">Pick muscle groups and goal intensity.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                        2
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Train with structure</p>
                        <p className="text-sm text-slate-600">Use templates that adapt to your sessions.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                        3
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Review and adjust</p>
                        <p className="text-sm text-slate-600">See progress, then refine your plan.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 pb-16">
            <Card className="overflow-hidden border-0 bg-slate-900 to-slate-800 text-white shadow-2xl">
              <div className="p-8 md:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl animate-fade-up" style={{ animationDelay: "120ms" }}>
                    <div className="flex items-center gap-3 text-emerald-100">
                      <Heart className="h-6 w-6" />
                      <p className="text-xs uppercase tracking-[0.24em]">Support</p>
                    </div>
                    <h2
                      style={{ fontFamily: "var(--font-display)" }}
                      className="mt-4 text-3xl font-semibold text-white"
                    >
                      Help the app grow with the community.
                    </h2>
                    <p className="mt-4 text-lg text-emerald-100/90">
                      Share the platform with friends or support development on GitHub.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-white text-slate-900 hover:bg-emerald-50">
                      <Users className="mr-2 h-4 w-4" />
                      Share with friends
                    </Button>
                    <Button variant="outline" className="border-white text-black hover:bg-slate-900 hover:text-white" asChild>
                      <a href="https://github.com/rodionspi" target="_blank" rel="noopener noreferrer">
                        <Heart className="mr-2 h-4 w-4" />
                        Support development
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section className="max-w-6xl mx-auto px-6 pb-16">
            <Card className="border border-white/60 bg-slate-300 shadow-xl backdrop-blur">
              <CardContent className="p-8 md:p-10">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl animate-fade-up" style={{ animationDelay: "100ms" }}>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Developer</p>
                    <h2
                      style={{ fontFamily: "var(--font-display)" }}
                      className="mt-3 text-3xl font-semibold text-slate-900"
                    >
                      Built by an independent developer.
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                      I build with JavaScript and TypeScript, focusing on thoughtful UI and clear training flows. Reach
                      out on GitHub if you want to collaborate or share ideas.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                        JavaScript
                      </span>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                        TypeScript
                      </span>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                        React
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                        2+ years experience
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" className="border-slate-700 text-slate-700 hover:bg-white" asChild>
                      <a href="https://github.com/rodionspi" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View GitHub
                      </a>
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800" asChild>
                      <a href="/profile/login">Sign in</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="max-w-6xl mx-auto px-6 pb-20 text-center">
            <Card className="border-0 bg-slate-900 text-white shadow-2xl">
              <CardContent className="p-12">
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-3xl font-semibold"
                >
                  Ready to start your next training block?
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-200">
                  Organize your plan, visualize your progress, and stay consistent week after week.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-emerald-50" asChild>
                    <a href="/exercises">Start with exercises</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </PageWrapper>
  )
}

export default About
