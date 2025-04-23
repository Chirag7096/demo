import {NextRequest, NextResponse} from 'next/server';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {accessKeyId: process.env.AWS_ACCESS_KEY_ID!, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!},
});

async function uploadFileToS3(Body: Buffer, fileName: string, ContentType: string, location: string) {
  const Key = `${location}/${fileName}#${Date.now()}`;
  await s3.send(new PutObjectCommand({Key, Body, ContentType, Bucket: process.env.AWS_BUCKET_NAME!}));
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const location = (formData.get('location') as string) || 'uploads';

    if (!file) return NextResponse.json({error: 'File is required.'}, {status: 400});

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileUrl = await uploadFileToS3(buffer, file.name, file.type, location);

    return NextResponse.json({success: true, fileUrl});
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return NextResponse.json({error: 'Something went wrong'}, {status: 500});
  }
}
