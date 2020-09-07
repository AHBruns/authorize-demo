export function Hero({
  callToAction,
  schemelessUrl,
}: {
  callToAction: string;
  schemelessUrl: string;
}) {
  return (
    <div className="relative px-4 py-56 overflow-hidden bg-black">
      <h1 className="relative z-10 max-w-5xl mx-auto text-4xl font-bold tracking-wider text-center text-white uppercase sm:text-5xl md:text-6xl">
        {callToAction}
      </h1>
      <img
        src={`https:${schemelessUrl}?fm=jpg&fl=progressive`}
        className="absolute bottom-0 right-0 object-cover object-bottom min-w-full min-h-full opacity-75"
      />
    </div>
  );
}
