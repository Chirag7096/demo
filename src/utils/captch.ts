export async function verifyCaptchaToken(token: string) {
  const url = new URL('https://www.google.com/recaptcha/api/siteverify');
  url.searchParams.append('secret', process.env.CAPTCHA_SECRET!);
  url.searchParams.append('response', token);
  const response = await fetch(url.toString(), {method: 'POST'});
  return response.json();
}


const url = `https://recaptchaenterprise.googleapis.com/v1/projects/fabled-sector-448104-i0/assessments?key=${}`