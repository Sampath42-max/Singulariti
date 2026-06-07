export interface CalculatorContent {
  howToUse: string[];
  faqs: { question: string; answer: string; }[];
}

const contentMap: Record<string, CalculatorContent> = {
  'age-calculator': {
    howToUse: [
      "Select your date of birth using the calendar picker.",
      "Optionally, select a target date to calculate age at a specific point in time.",
      "The tool instantly computes your exact age in years, months, and days.",
      "Review the detailed breakdown of total days, weeks, and hours."
    ],
    faqs: [
      { question: "Does this store my birth date?", answer: "No, all date calculations happen locally in your browser. We do not store or transmit your personal data." },
      { question: "Can I calculate age for future dates?", answer: "Yes, you can set the target date to the future to see exactly how old you will be." }
    ]
  },
  'emi-calculator': {
    howToUse: [
      "Enter the total loan amount you wish to borrow.",
      "Input the annual interest rate.",
      "Specify the loan tenure in years or months.",
      "Review the interactive chart showing the breakdown of principal versus interest."
    ],
    faqs: [
      { question: "Is this calculation exact?", answer: "The calculator uses standard financial formulas for EMI. However, banks may have slight variations based on processing fees and compounding schedules." },
      { question: "Is my financial data secure?", answer: "Yes, because the calculations run 100% locally on your device without communicating with a server." }
    ]
  },
  'sip-calculator': {
    howToUse: [
      "Enter your expected monthly investment amount.",
      "Input the expected annual return rate (CAGR).",
      "Set the investment duration in years.",
      "The tool will instantly chart your invested amount versus your estimated returns."
    ],
    faqs: [
      { question: "Does this account for inflation?", answer: "This specific calculator provides nominal returns. You will need to manually adjust expectations for inflation." },
      { question: "Is the data saved?", answer: "No, the inputs are processed locally and vanish when you close the tab." }
    ]
  },
  'compound-interest-calculator': {
    howToUse: [
      "Enter your initial principal balance.",
      "Input the interest rate and compounding frequency (daily, monthly, annually).",
      "Specify how many years the money will be invested.",
      "View the curve showing exponential growth over time."
    ],
    faqs: [
      { question: "Can I add regular contributions?", answer: "Yes, you can toggle the option to add regular monthly or yearly contributions to see the effect on the total." },
      { question: "Is it secure to use?", answer: "Yes, it is a fully client-side tool." }
    ]
  },
  'cagr-calculator': {
    howToUse: [
      "Enter the initial value of your investment.",
      "Enter the final value of your investment.",
      "Input the total number of years the investment was held.",
      "The tool calculates the Compound Annual Growth Rate (CAGR) instantly."
    ],
    faqs: [
      { question: "What does CAGR tell me?", answer: "CAGR smooths out the returns of an investment, giving you the steady annual rate of return." },
      { question: "Does it account for intermediate cash flows?", answer: "No, CAGR only looks at beginning and ending values. For multiple cash flows, use an XIRR calculator." }
    ]
  },
  'fd-calculator': {
    howToUse: [
      "Enter your Fixed Deposit principal amount.",
      "Input the bank's offered interest rate.",
      "Set the duration of the deposit.",
      "Select the compounding frequency (quarterly is standard in many regions)."
    ],
    faqs: [
      { question: "Is tax deduction (TDS) considered?", answer: "By default, this calculates gross returns. You will need to factor in TDS separately based on your tax bracket." },
      { question: "Are my financial details safe?", answer: "Yes, entirely. The calculator runs solely in your web browser." }
    ]
  },
  'income-tax-calculator': {
    howToUse: [
      "Select your financial year and age group.",
      "Enter your gross salary and other sources of income.",
      "Input any eligible deductions (like 80C, HRA).",
      "The tool will estimate your total tax liability under the current regime."
    ],
    faqs: [
      { question: "Is this for the old or new regime?", answer: "The calculator provides a comparison between both regimes so you can choose the most beneficial one." },
      { question: "Is my income data collected?", answer: "No. Your financial privacy is guaranteed as everything computes locally on your machine." }
    ]
  },
  'gst-calculator': {
    howToUse: [
      "Enter the net price of the product or service.",
      "Select the applicable GST slab rate.",
      "Choose whether to add or remove GST.",
      "The tool instantly shows CGST, SGST, and the total gross amount."
    ],
    faqs: [
      { question: "What is the difference between Add and Remove GST?", answer: "'Add' calculates the tax on top of your base amount. 'Remove' extracts the tax portion from an already inclusive total." },
      { question: "Does this require internet?", answer: "Once the page is loaded, the calculator works entirely offline." }
    ]
  },
  'bmi-calculator': {
    howToUse: [
      "Select your preferred units (Metric or Imperial).",
      "Enter your current weight and height.",
      "The tool computes your Body Mass Index instantly.",
      "View the gauge to see which health category your BMI falls into."
    ],
    faqs: [
      { question: "Is BMI an accurate measure of health?", answer: "BMI is a general indicator of body fat based on height and weight. It does not account for muscle mass, bone density, or overall body composition." },
      { question: "Is my health data saved?", answer: "No, your measurements are completely private and processed locally." }
    ]
  },
  'calorie-calculator': {
    howToUse: [
      "Input your age, gender, height, and weight.",
      "Select your daily physical activity level.",
      "The tool calculates your Total Daily Energy Expenditure (TDEE).",
      "Review the recommended caloric intake for maintenance, weight loss, or weight gain."
    ],
    faqs: [
      { question: "What formula does this use?", answer: "It uses the Mifflin-St Jeor equation, which is widely considered the most accurate standard formula for BMR." },
      { question: "Is my data stored?", answer: "No, all health metrics are processed instantly in your browser with zero data collection." }
    ]
  },
  'percentage-calculator': {
    howToUse: [
      "Select the type of percentage calculation you need (e.g., X% of Y, or percentage increase).",
      "Input your raw numbers into the designated fields.",
      "The result updates automatically as you type."
    ],
    faqs: [
      { question: "Can it calculate percentage decrease?", answer: "Yes, you can use the percentage change mode to calculate both increases and decreases." },
      { question: "Is this free to use?", answer: "Yes, absolutely free and unlimited." }
    ]
  },
  'cgpa-calculator': {
    howToUse: [
      "Enter the credits and grade point for each course/subject.",
      "Click 'Add Subject' for additional courses.",
      "The tool automatically calculates your total GPA or CGPA based on the weighted credits."
    ],
    faqs: [
      { question: "Does this support letter grades?", answer: "Currently, it accepts numerical grade points, but you can easily map your letter grades to numbers based on your university's scale." },
      { question: "Is this data tracked?", answer: "No, your academic data remains entirely private and local." }
    ]
  },
  'date-difference-calculator': {
    howToUse: [
      "Select the Start Date.",
      "Select the End Date.",
      "Check the options to include or exclude the end date.",
      "The tool calculates the total elapsed time in years, months, weeks, and days."
    ],
    faqs: [
      { question: "Does it account for leap years?", answer: "Yes, the standard date algorithms used perfectly account for leap years and varying month lengths." },
      { question: "Are my dates saved?", answer: "No, date calculations are performed strictly locally." }
    ]
  },
  'scientific-calculator': {
    howToUse: [
      "Use your keyboard or the on-screen buttons to enter your mathematical expression.",
      "Utilize advanced functions like trigonometry (sin, cos, tan), logarithms, and exponents.",
      "Press '=' or Enter to evaluate the expression."
    ],
    faqs: [
      { question: "Does it support radians and degrees?", answer: "Yes, you can toggle between Radians and Degrees mode for trigonometric functions." },
      { question: "Is the calculation history saved?", answer: "History is kept temporarily in your browser session for convenience but is wiped when you close the tab." }
    ]
  },
  'discount-calculator': {
    howToUse: [
      "Enter the original price of the item.",
      "Input the discount percentage or fixed discount amount.",
      "The tool calculates your total savings and the final price to pay."
    ],
    faqs: [
      { question: "Can I apply multiple discounts?", answer: "You can calculate stacked discounts by taking the final price of the first calculation and running it again." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'profit-calculator': {
    howToUse: [
      "Enter your total cost price or cost of goods sold.",
      "Enter your selling price.",
      "The tool computes your gross profit and profit margin percentage instantly."
    ],
    faqs: [
      { question: "What is the difference between markup and margin?", answer: "Markup is the percentage of profit based on the cost. Margin is the percentage of profit based on the selling price. The tool shows both." },
      { question: "Is my business data secure?", answer: "Yes, all business calculations are executed client-side, ensuring total privacy." }
    ]
  },
  'roi-calculator': {
    howToUse: [
      "Input the total amount invested.",
      "Input the amount returned or the final value.",
      "The tool calculates your Return on Investment (ROI) percentage."
    ],
    faqs: [
      { question: "Does this calculate annualized ROI?", answer: "You can input the time period to see both absolute ROI and annualized ROI." },
      { question: "Is this secure?", answer: "Yes, completely local and private." }
    ]
  },
  'currency-converter': {
    howToUse: [
      "Select your base currency.",
      "Select the target currency.",
      "Input the amount you wish to convert.",
      "The tool fetches the latest exchange rate and computes the converted value."
    ],
    faqs: [
      { question: "How often are the exchange rates updated?", answer: "Exchange rates are updated frequently using a secure third-party financial API, but may not reflect real-time trading values." },
      { question: "Is this suitable for trading?", answer: "This is for informational purposes only. Do not use these rates for critical financial trading." }
    ]
  },
  'youtube-earnings-calculator': {
    howToUse: [
      "Enter the total number of daily video views.",
      "Use the slider to set an estimated CPM (Cost Per Mille).",
      "The tool estimates your daily, monthly, and yearly revenue based on average YouTube splits."
    ],
    faqs: [
      { question: "Is this an exact amount?", answer: "No, it is an estimation. Actual YouTube earnings vary wildly based on audience geography, niche, and ad engagement." },
      { question: "Is my data collected?", answer: "No, all estimations run locally in your browser." }
    ]
  },
  'adsense-revenue-calculator': {
    howToUse: [
      "Enter your daily page views.",
      "Input your website's estimated Click-Through Rate (CTR).",
      "Enter the average Cost Per Click (CPC).",
      "The tool projects your AdSense revenue over time."
    ],
    faqs: [
      { question: "How accurate is this?", answer: "It is a mathematical projection based on your inputs. Real AdSense revenue fluctuates daily based on advertiser bidding." },
      { question: "Is my traffic data secure?", answer: "Yes, we do not log or store the traffic numbers you input." }
    ]
  },
  'mortgage-calculator': {
    howToUse: [
      "Enter the home price and your down payment amount.",
      "Input the loan interest rate and term (in years).",
      "The tool calculates your monthly mortgage payment including principal and interest."
    ],
    faqs: [
      { question: "Does it include property taxes and insurance?", answer: "You can expand the advanced section to add estimated property taxes, PMI, and home insurance for a complete PITI payment." },
      { question: "Is the calculation local?", answer: "Yes, ensuring your financial planning remains completely private." }
    ]
  },
  'basic-calculator': {
    howToUse: [
      "Use your keyboard or click the buttons to input numbers.",
      "Click the operation buttons (+, -, *, /).",
      "Click '=' to evaluate the result instantly."
    ],
    faqs: [
      { question: "Does it support keyboard shortcuts?", answer: "Yes, you can type normally using your keyboard's numpad for quick calculations." },
      { question: "Is history saved?", answer: "Calculation history remains during your active session but is cleared upon reload for privacy." }
    ]
  },
  'loan-calculator': {
    howToUse: [
      "Enter the loan amount you are requesting.",
      "Input the interest rate and loan duration.",
      "The tool computes your monthly payments and total interest payable."
    ],
    faqs: [
      { question: "Does this work for auto loans?", answer: "Yes, the standard amortization formula used here applies to auto loans, personal loans, and general installment loans." },
      { question: "Is my data private?", answer: "Yes, completely local execution." }
    ]
  },
  'simple-interest-calculator': {
    howToUse: [
      "Enter the principal amount.",
      "Input the interest rate.",
      "Specify the time period.",
      "The tool calculates the simple interest and total amount directly."
    ],
    faqs: [
      { question: "What is the difference between simple and compound interest?", answer: "Simple interest is calculated only on the principal amount, whereas compound interest is calculated on both the principal and the accumulated interest." },
      { question: "Is this free to use?", answer: "Yes, completely free." }
    ]
  },
  'salary-calculator': {
    howToUse: [
      "Enter your base hourly, weekly, or monthly rate.",
      "Specify your working hours per week.",
      "The tool projects your gross salary across different timeframes (monthly, annually)."
    ],
    faqs: [
      { question: "Does this include taxes?", answer: "This tool calculates gross salary. For net take-home pay, you should use the Income Tax Calculator in conjunction." },
      { question: "Is my salary information stored?", answer: "No, your salary details are entirely processed on your own device." }
    ]
  },
  'tip-calculator': {
    howToUse: [
      "Enter the total bill amount.",
      "Select or type the tip percentage you wish to leave.",
      "Specify how many people are splitting the bill.",
      "The tool shows the tip amount, total bill, and the exact amount each person owes."
    ],
    faqs: [
      { question: "Is the split equal?", answer: "Yes, the tool assumes an even split among all members." },
      { question: "Is this free?", answer: "Yes, free and local." }
    ]
  },
  'time-duration-calculator': {
    howToUse: [
      "Enter a starting time (hours, minutes, AM/PM).",
      "Enter an ending time.",
      "The tool calculates the exact duration elapsed between the two timestamps."
    ],
    faqs: [
      { question: "Does it support 24-hour formats?", answer: "Yes, you can toggle between 12-hour and 24-hour time formats for input." },
      { question: "Is my data saved?", answer: "No, all processing is strictly local." }
    ]
  }
};

export function getCalculatorContent(toolId: string): CalculatorContent {
  const data = contentMap[toolId];
  if (data) return data;
  
  // Fallback
  return {
    howToUse: [
      "Input your raw data or numbers into the designated fields.",
      "Adjust any specific settings, units, or options as needed.",
      "The calculator will process and display the results instantly.",
      "Review the detailed breakdown provided."
    ],
    faqs: [
      { question: "Is this tool free to use?", answer: "Yes, this tool is completely free with no hidden limits." },
      { question: "Are my calculations uploaded to a server?", answer: "No, all processing happens locally in your browser ensuring complete privacy and security." }
    ]
  };
}
