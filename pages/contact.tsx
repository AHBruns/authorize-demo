function Contact() {
  return (
    <div className="flex items-center justify-center px-4 py-16 sm:px-16 sm:py-32">
      <div className="flex flex-col w-full max-w-lg p-4 space-y-4 bg-gray-800 rounded-sm shadow-lg">
        <h1 className="text-3xl font-bold leading-tight tracking-wider text-white uppercase">
          Contact Me
        </h1>
        <input
          className="px-3 py-2 text-gray-800 rounded-sm shadow-lg focus:outline-none"
          placeholder="your email"
        />
        <textarea
          className="px-3 py-2 text-gray-800 rounded-sm shadow-lg focus:outline-none"
          style={{ minHeight: 300 }}
          placeholder="your message"
        />
        <button
          onClick={() =>
            alert(
              "Nothing was sent because this is a fake site, but if this were a real site the author would have gotten your nicely worded message."
            )
          }
          className="px-3 py-2 text-xl font-semibold text-gray-700 uppercase bg-white rounded-sm shadow-lg focus:text-gray-900 hover:text-gray-900 focus:outline-none"
        >
          submit
        </button>
      </div>
    </div>
  );
}

export default Contact;
