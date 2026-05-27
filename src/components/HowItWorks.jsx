import React from "react";

const steps = [
  "Upload Your Resume",
  "Get Instant Analysis",
  "Generate Career Plan",
  "Get Hired Faster",
];

const HowItWorks = () => {
  return (
    <section className="px-20 py-16 bg-gray-50">

      <h2 className="text-3xl font-bold text-center mb-10">
        How It Works
      </h2>

      <div className="grid grid-cols-4 gap-8">

        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow text-center"
          >
            <div className="text-indigo-600 text-3xl font-bold">
              {index + 1}
            </div>

            <p className="mt-4 text-gray-700 font-medium">
              {step}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
};

export default HowItWorks;