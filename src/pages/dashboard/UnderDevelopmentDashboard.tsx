export default function UnderDevelopmentDashboard() {
  return (
    <div className="min-h-[calc(100vh-81px)] bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm sm:p-10">
          <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            Dashboard
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            This page is still under development
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Your login was successful, and the dashboard experience is being prepared. Please check back soon for your learning overview, progress tracking, and course management tools.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Courses</p>
              <p className="mt-2 text-2xl font-bold text-slate-800">Coming soon</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Progress</p>
              <p className="mt-2 text-2xl font-bold text-slate-800">Coming soon</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Certificates</p>
              <p className="mt-2 text-2xl font-bold text-slate-800">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
