'use client';

export default function Copyright() {
  const currentYear = new Date().getFullYear();
  
  return (
    <p className="text-red-600 text-sm">
      {currentYear} SRT Crackers. All rights reserved. License No: E/SS/TN
    </p>
  );
}
