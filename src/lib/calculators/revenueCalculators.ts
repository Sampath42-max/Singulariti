export function calculateYoutubeEarnings(
  dailyViews: number,
  cpm: number,
  rpm: number,
  monetizedPercent: number
) {
  // Estimated Earnings = Views × Monetized Percentage × RPM / 1000
  const dailyMonetizedViews = dailyViews * (monetizedPercent / 100);
  
  const dailyEarnings = (dailyMonetizedViews * rpm) / 1000;
  const monthlyEarnings = dailyEarnings * 30.42; // Average days in month
  const yearlyEarnings = dailyEarnings * 365;

  // Also estimate based on CPM for advertising revenue estimation
  const dailyCpmRevenue = (dailyMonetizedViews * cpm) / 1000;
  const monthlyCpmRevenue = dailyCpmRevenue * 30.42;
  const yearlyCpmRevenue = dailyCpmRevenue * 365;

  return {
    dailyEarnings,
    monthlyEarnings,
    yearlyEarnings,
    dailyCpmRevenue,
    monthlyCpmRevenue,
    yearlyCpmRevenue
  };
}

export function calculateAdSenseRevenue(
  pageViews: number,
  ctrPercent: number,
  cpc: number,
  rpm = 0
) {
  // Clicks = Page Views × CTR / 100
  const estimatedClicks = (pageViews * ctrPercent) / 100;
  // Revenue = Clicks × CPC
  const estimatedRevenue = estimatedClicks * cpc;

  let rpmRevenue = 0;
  if (rpm > 0) {
    // RPM Revenue = Page Views × RPM / 1000
    rpmRevenue = (pageViews * rpm) / 1000;
  }

  // Calculate earnings periods
  return {
    estimatedClicks,
    estimatedRevenue,
    rpmRevenue,
    dailyRevenue: estimatedRevenue,
    monthlyRevenue: estimatedRevenue * 30.42,
    yearlyRevenue: estimatedRevenue * 365,
    dailyRpmRevenue: rpmRevenue,
    monthlyRpmRevenue: rpmRevenue * 30.42,
    yearlyRpmRevenue: rpmRevenue * 365
  };
}
