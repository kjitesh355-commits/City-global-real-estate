export const GradientBackground = () => {
  return (
    <>
      {/* Top gold glow for smooth section transition */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(212,175,55,0.04) 0%, transparent 100%)",
        }}
      />
      {/* Center radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.03) 0%, transparent 50%)",
        }}
      />
    </>
  );
};
