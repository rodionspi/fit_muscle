import PageWrapper from "@/components/custom/PageWrapper"
import { Github, Mail, Heart, Users, TrendingUp, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const About = () => {
  return (
    <PageWrapper>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative overflow-hidden via-slate-800 to-slate-900 text-white">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-10 bg-cover bg-center"></div>
          <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <Target className="w-10 h-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              About Trainer App
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Your ultimate companion for muscle growth, strength gains, and fitness progression
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-16 rounded-md">
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Progress Tracking</h3>
                <p className="text-slate-600 leading-relaxed">
                  Advanced analytics to help you progress faster and more effectively in muscle growth and strength
                  gains.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Custom Programs</h3>
                <p className="text-slate-600 leading-relaxed">
                  Find the best training program that suits your goals, experience level, and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Visual Learning</h3>
                <p className="text-slate-600 leading-relaxed">
                  Choose from muscle displays including interactive tables, graphs, and detailed anatomical charts.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What We Offer Section */}
          <div className="mb-16">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8">
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="w-8 h-8 mr-3" />
                  What can this app help you with?
                </h2>
              </div>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate-700 text-lg leading-relaxed mb-6">
                    This app will help you figure out how to progress faster and more effectively in muscle growth and
                    strength gains. You can find the best training program that suits you. You can also choose from
                    muscle displays such as a table, graph, and more.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-slate-600">Personalized training programs</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-slate-600">Interactive muscle visualization</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-slate-600">Progress tracking and analytics</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-slate-600">Evidence-based recommendations</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Section */}
          <div className="mb-16">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-500 p-8">
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                  <Heart className="w-8 h-8 mr-3" />
                  How can you help this app grow?
                </h2>
              </div>
              <CardContent className="p-8">
                <p className="text-slate-700 text-lg leading-relaxed mb-8">
                  I would be glad if you could share this application with colleagues, friends, relatives and so on. You
                  can also send me donations if you want to contribute to the development of this application (the card
                  number is attached in my github, see below)
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Share with Friends
                  </Button>
                  <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                    <Heart className="w-4 h-4 mr-2" />
                    Support Development
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Developer Section */}
          <div className="mb-16">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-8">
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                  <Github className="w-8 h-8 mr-3" />
                  Who is working on the website development?
                </h2>
              </div>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  <div className="flex-1">
                    <p className="text-slate-700 text-lg leading-relaxed mb-6">
                      My{" "}
                      <a
                        href="https://github.com/rodionspi"
                        className="text-purple-600 hover:text-purple-700 font-semibold underline decoration-2 underline-offset-2 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        github
                      </a>
                      . I am a developer with two years of experience. I have experience with JavaScript and TypeScript
                      languages. If you want to ask me something or you are interested in something, write to me at my
                      e-mail below
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        JavaScript
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        TypeScript
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        React
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        2+ Years Experience
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50" asChild>
                      <a href="https://github.com/rodionspi" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View GitHub
                      </a>
                    </Button>
                    <Button variant="outline" className="border-slate-500 text-slate-600 hover:bg-slate-50">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-4">Ready to Start Your Fitness Journey?</h3>
                <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of users who are already achieving their fitness goals with our comprehensive training
                  platform.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-slate-900"
                  >
                    View Muscle Chart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default About
