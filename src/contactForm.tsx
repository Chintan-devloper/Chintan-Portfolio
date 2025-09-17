import { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, //key
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, //key
        e.target as HTMLFormElement,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY //key
      )
      .then(
        () => {
          setMessageSent(true);
          (e.target as HTMLFormElement).reset();
          setTimeout(() => setMessageSent(false), 3000);
        },
        (error) => {
          console.error("Email send failed:", error);
        }
      );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700"
    >
      <h3 className="text-2xl font-bold mb-4 text-white">Get in Touch</h3>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-300 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="user_name"
          className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-300 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="user_email"
          className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-300 font-bold mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 transition duration-300"
      >
        Send Message
      </button>

      {messageSent && (
        <p className="mt-4 text-center text-green-400 font-medium">
          Message sent successfully!
        </p>
      )}
    </form>
  );
};

export default ContactForm;
