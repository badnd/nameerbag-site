export function PlainEmail({ email, link = true }) {
  const content = link ? `<a href="mailto:${email}">${email}</a>` : email;

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `<!--email_off-->${content}<!--/email_off-->`
      }}
    />
  );
}
