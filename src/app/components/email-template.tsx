interface EmailTemplateProps {
  firstName: string;
  confirmationUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  confirmationUrl,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>

    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur,
      explicabo.
    </p>

    <button className="bg-slate-500 px-3 py-2">
      <a href={confirmationUrl}>CLICK TO CONFIRM YOUR EMAIL</a>
    </button>
  </div>
);
