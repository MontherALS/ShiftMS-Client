import React from "react";
import MyNav from "../components/NavBar";
export default function HelpPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <MyNav />
      <section className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800">Help & Support</h1>
        <p className="text-gray-600 mt-2">
          Quick tips to help you navigate ShiftGroups and manage your teams.
        </p>
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800">FAQs</h2>
          <ul className="mt-3 space-y-3">
            <li className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-800">
                How do I create or manage a group?
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Go to the Groups page. Use the controls there to add a new
                group, edit details, and manage members.
              </p>
            </li>
            <li className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-800">
                How do I add an employee?
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Open the Add Employee page and fill in the required fields. The
                new employee will appear in the list and can be assigned to
                groups.
              </p>
            </li>
            <li className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-800">How do I log out?</p>
              <p className="text-gray-600 text-sm mt-1">
                Use the Logout button in the top navigation bar; confirm the
                prompt to finish logging out.
              </p>
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800">
            Troubleshooting
          </h2>
          <ul className="list-disc ml-5 text-gray-600 mt-2 space-y-2">
            <li>Can’t access pages? Make sure you’re logged in .</li>
            <li>Changes not showing? Try refreshing the page.</li>
            <li>If an action fails, check your network or try again later.</li>
          </ul>
        </div>

        <footer className="mt-12 text-sm text-gray-500">
          Need more help? Contact technical support.
        </footer>
      </section>
    </main>
  );
}
