"use client";
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) { return <main className="state-page"><p className="eyebrow">SOMETHING WENT WRONG</p><h1>We couldn’t load this view.</h1><p className="muted">Your farm data is safe. Please try again.</p><button className="button primary" onClick={reset}>Try again</button></main>; }
