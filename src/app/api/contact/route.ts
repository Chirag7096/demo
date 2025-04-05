import { dbConnect } from '@/utils';
import { contectUs } from '@/models';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !email || !message)
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });

    await dbConnect();

    await contectUs.insertOne({ email, message, lastName, firstName });

    return NextResponse.json({ message: 'Our Team will reach you.' });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
