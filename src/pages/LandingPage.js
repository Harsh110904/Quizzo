import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const LandingPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-semibold text-neutral-900 mb-6 leading-tight">
          Transform documents into
          <br />
          <span className="text-neutral-600">interactive quizzes</span>
        </h1>
        
        <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Upload any document and instantly generate engaging quizzes. 
          Perfect for studying, training, or testing comprehension.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/upload">
            <Button size="lg">
              Create Your First Quiz
            </Button>
          </Link>
          <Button variant="secondary" size="lg">
            See How It Works
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-neutral-900 mb-4">
            Everything you need to create great quizzes
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Simple, powerful tools that make quiz creation effortless
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card p-8 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-neutral-900 mb-3">
              Easy Upload
            </h3>
            <p className="text-neutral-600">
              Simply drag and drop your PDF, Word doc, or text file. 
              We'll handle the rest automatically.
            </p>
          </div>
          
          <div className="card p-8 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-neutral-900 mb-3">
              Instant Generation
            </h3>
            <p className="text-neutral-600">
              Get comprehensive quizzes generated from your content in seconds, 
              not hours.
            </p>
          </div>
          
          <div className="card p-8 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-neutral-900 mb-3">
              Smart Analytics
            </h3>
            <p className="text-neutral-600">
              Track performance and identify knowledge gaps with detailed 
              results and insights.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-neutral-900 mb-4">
            How it works
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Three simple steps to create your quiz
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-neutral-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-semibold">
              1
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-3">
              Upload Document
            </h3>
            <p className="text-neutral-600">
              Choose any PDF, Word document, or text file from your device
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-neutral-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-semibold">
              2
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-3">
              Generate Quiz
            </h3>
            <p className="text-neutral-600">
              Our system analyzes your content and creates relevant questions
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-neutral-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-semibold">
              3
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-3">
              Take & Review
            </h3>
            <p className="text-neutral-600">
              Complete your quiz and review detailed results and explanations
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="card p-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-neutral-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Create your first quiz in under a minute
          </p>
          <Link to="/upload">
            <Button size="lg">
              Upload Your Document
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;