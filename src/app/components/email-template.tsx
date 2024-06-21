import React from "react";

interface EmailTemplateProps {
  firstName: string;
  confirmationUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  confirmationUrl,
}) => (
  <div style={styles.container}>
    <div style={styles.content}>
      <h1 style={styles.header}>Welcome, {firstName}!</h1>
      <p style={styles.message}>
        Thank you for registering with us. To complete your registration and
        start using our services, please confirm your email address by clicking
        the link below.
        {confirmationUrl}
      </p>
      <a href={confirmationUrl} style={styles.button}>
        Confirm Your Email
      </a>
    </div>
  </div>
);

const styles = {
  container: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    padding: "20px",
    backgroundColor: "#f4f4f7",
    color: "#51545e",
    lineHeight: "1.4",
    fontSize: "16px",
  },
  content: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333333",
  },
  message: {
    marginBottom: "20px",
  },
  button: {
    display: "inline-block",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#0070f3",
    borderRadius: "5px",
    textDecoration: "none",
    transition: "background-color 0.3s",
  },
};

export default EmailTemplate;
