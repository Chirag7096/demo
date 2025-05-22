export function getCaptchaToken(): Promise<string> {
  return new Promise((res, rej) => {
    if (!window.grecaptcha || !window.grecaptcha.enterprise) return rej(new Error('reCAPTCHA not loaded'));

    window.grecaptcha.enterprise.ready(async () => {
      try {
        res(await window.grecaptcha.enterprise.execute(process.env.NEXT_PUBLIC_CAPTCHA_KEY!, {action: 'contact_us'}));
      } catch (err) {
        rej(err);
      }
    });
  });
}

export async function verifyCaptchaToken(token: string) {
  const url = new URL('https://www.google.com/recaptcha/api/siteverify');
  url.searchParams.append('secret', process.env.CAPTCHA_SECRET!);
  url.searchParams.append('response', token);
  const response = await fetch(url.toString(), {method: 'POST'});
  return response.json();
}
