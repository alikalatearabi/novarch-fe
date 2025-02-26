import axios, { AxiosResponse } from "axios";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function getImageData(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error('Error fetching image data:', error);
    throw error;
  }
}

/**
 * Secure endpoint for fetching presigned url of images from minio
 * @returns 
 */
export async function GET(request: NextApiRequest, { params: { path } }) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('token');
  const address = path.join('/');

  try {
    const baseURL = process.env.NEXT_PUBLIC_API_ADDRESS;

    const res = await axios.get<any, AxiosResponse<string>>(new URL(`/api/files/presigned/${address}`, baseURL).href, {
      headers: {
        'Authorization': `Bearer ${tokenCookie.value}`
      }
    });

    if (res.status === 200) {

      return NextResponse.redirect(res.data);
    }
  } catch (error) {
    console.error('Error downloading image:', error.message, error.response);
    return NextResponse.error();
  }
}
