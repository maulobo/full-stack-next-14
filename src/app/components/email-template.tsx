interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>

    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur,
      explicabo.
    </p>

    <button className="bg-slate-500 px-3 py-2">
      <a href="https://youtube.com">CLICKEA</a>
    </button>
  </div>
);
