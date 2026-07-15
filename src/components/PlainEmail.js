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

export function PlainEmailLink({ email, label, className, subject = '' }) {
  const href = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
  return (
    <span
      style={{ display: 'contents' }}
      dangerouslySetInnerHTML={{
        __html: `<!--email_off--><a class="${className}" href="${href}">${label}</a><!--/email_off-->`
      }}
    />
  );
}
