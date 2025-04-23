export function getCaptchaToken(): Promise<string> {
  return new Promise((res) => {
    // @ts-expect-error grecaptcha type is missing
    grecaptcha.enterprise.ready(async () => {
      // @ts-expect-error grecaptcha type is missing
      res(await grecaptcha.enterprise.execute(process.env.NEXT_PUBLIC_CAPTCHA_KEY, {action: 'contect_us'}));
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
