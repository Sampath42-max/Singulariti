import React from 'react';

export function TypingSeoContent() {
  return (
    <article className="max-w-4xl mx-auto mt-24 prose prose-slate dark:prose-invert font-sans">
      <h2 className="text-3xl font-display font-bold">About the Typing Speed Test</h2>
      <p>
        Welcome to the most advanced, privacy-first typing speed test on the web. Our platform is designed to help you accurately measure your typing speed (WPM), improve your accuracy, and build muscle memory through intelligent mistake analysis—all entirely within your browser. 
      </p>

      <h3 className="text-2xl font-display font-bold mt-8">What is WPM?</h3>
      <p>
        WPM stands for Words Per Minute. It is the standard measurement for typing speed. In modern typing tests, a &quot;word&quot; is standardized as exactly 5 keystrokes (including spaces). This ensures that your WPM score remains consistent regardless of whether you are typing short or long words.
      </p>

      <h3 className="text-2xl font-display font-bold mt-8">How is typing speed calculated?</h3>
      <p>
        Your typing speed is calculated by taking the total number of correctly typed characters, dividing by 5 to get the number of standard words, and then dividing by the time elapsed in minutes.
      </p>
      <ul>
        <li><strong>Raw WPM:</strong> Your speed including mistakes.</li>
        <li><strong>Net WPM:</strong> Your true speed after accounting for uncorrected errors.</li>
        <li><strong>Accuracy:</strong> The percentage of correct keystrokes out of your total keystrokes.</li>
      </ul>

      <h3 className="text-2xl font-display font-bold mt-8">Average Typing Speed by Profession</h3>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2 pr-4 font-bold">Profession</th>
              <th className="py-2 pr-4 font-bold">Average WPM</th>
              <th className="py-2 pr-4 font-bold">Requirement Level</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">General Population</td>
              <td className="py-2 pr-4">40 WPM</td>
              <td className="py-2 pr-4">Average</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">Programmer / Developer</td>
              <td className="py-2 pr-4">50 - 70 WPM</td>
              <td className="py-2 pr-4">High</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">Executive Assistant</td>
              <td className="py-2 pr-4">60 - 80 WPM</td>
              <td className="py-2 pr-4">Very High</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">Data Entry Specialist</td>
              <td className="py-2 pr-4">80+ WPM</td>
              <td className="py-2 pr-4">Expert</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-2xl font-display font-bold mt-8">How to Improve Your Typing Speed</h3>
      <p>
        Improving your typing speed is a marathon, not a sprint. Follow these proven tips:
      </p>
      <ol>
        <li><strong>Proper Hand Placement:</strong> Always rest your index fingers on the &apos;F&apos; and &apos;J&apos; keys. These keys usually have small tactile bumps to help you find them without looking.</li>
        <li><strong>Don&apos;t Look at the Keyboard:</strong> Train your muscle memory by keeping your eyes on the screen. Looking down breaks your flow and slows you down.</li>
        <li><strong>Focus on Accuracy First:</strong> Speed comes naturally with muscle memory. If you try to type fast while making mistakes, you are training your muscles to make mistakes. Aim for 98%+ accuracy.</li>
        <li><strong>Practice Consistently:</strong> Take our 60-second typing test for just 10 minutes every day. Consistent, focused practice yields the best results.</li>
      </ol>
      
      <p className="mt-8 text-sm text-slate">
        <em>Note: This tool runs 100% locally in your browser. We do not store or transmit any of your typing data to external servers. Your personal records and achievements are saved securely in your browser&apos;s local storage.</em>
      </p>
    </article>
  );
}
